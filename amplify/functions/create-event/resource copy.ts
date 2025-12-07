import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

const IG_USER_ID = process.env.IG_USER_ID!;
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN!;
const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL ?? '';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET ?? '';

type StrapiWebhookBody = {
    event: string; // 'entry.publish' など
    model: string; // 'event' など
    entry: {
        id: number;
        title?: string;
        description?: string;
        date?: string;
        cover?: {
            url?: string;
        };
        // 必要に応じてフィールド追加
    };
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    try {
        // ① メソッドチェック
        if (event.requestContext.http.method !== 'POST') {
            return {
                statusCode: 405,
                body: 'Method Not Allowed',
            };
        }

        // ② シークレット検証（Strapi Webhook で header か query に付ける）
        const receivedSecret = event.headers['x-webhook-secret'] ?? event.headers['X-Webhook-Secret'];
        if (WEBHOOK_SECRET && receivedSecret !== WEBHOOK_SECRET) {
            console.warn('Invalid webhook secret');
            return { statusCode: 401, body: 'Unauthorized' };
        }

        if (!event.body) {
            return { statusCode: 400, body: 'Missing body' };
        }

        const body = JSON.parse(event.body) as StrapiWebhookBody;

        // ③ Strapi のイベント種別チェック（publish のときだけ処理）
        if (body.event !== 'entry.publish') {
            return {
                statusCode: 200,
                body: `Ignored event: ${body.event}`,
            };
        }

        const entry = body.entry;
        const title = entry.title ?? 'Untitled event';
        const description = entry.description ?? '';
        const date = entry.date; // 2025-12-24 などを想定

        // ④ 画像URLを組み立て（Strapi Cloud は相対パスになることが多い）
        let imageUrl = entry.cover?.url;
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${STRAPI_BASE_URL}${imageUrl}`;
        }

        if (!imageUrl) {
            // 画像無し投稿にしたいなら、ここで別ロジックを書く
            console.warn('No image URL provided, skip posting.');
            return {
                statusCode: 200,
                body: 'No image URL, skipped.',
            };
        }

        // ⑤ キャプション組み立て
        const captionLines = [
            title,
            date ? `📅 ${formatDateForCaption(date)}` : '',
            '',
            description,
            '',
            '#event #yourProjectHashtag', // 好きなハッシュタグ
        ].filter(Boolean);

        const caption = captionLines.join('\n');

        // ⑥ Instagram Graph API: media 作成
        const mediaRes = await fetch(`https://graph.facebook.com/v21.0/${IG_USER_ID}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image_url: imageUrl,
                caption,
                access_token: IG_ACCESS_TOKEN,
            }),
        });

        const mediaJson = (await mediaRes.json()) as any;
        if (!mediaRes.ok) {
            console.error('IG media error', mediaJson);
            return {
                statusCode: 500,
                body: `IG media error: ${JSON.stringify(mediaJson)}`,
            };
        }

        const creationId = mediaJson.id as string;

        // ⑦ Instagram Graph API: publish
        const publishRes = await fetch(`https://graph.facebook.com/v21.0/${IG_USER_ID}/media_publish`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                creation_id: creationId,
                access_token: IG_ACCESS_TOKEN,
            }),
        });

        const publishJson = (await publishRes.json()) as any;
        if (!publishRes.ok) {
            console.error('IG publish error', publishJson);
            return {
                statusCode: 500,
                body: `IG publish error: ${JSON.stringify(publishJson)}`,
            };
        }

        console.log('IG post success', publishJson);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                igPostId: publishJson.id,
            }),
        };
    } catch (err) {
        console.error('Unexpected error', err);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
};

// 日付をキャプション向けに整形（必要ならロケール合わせて調整）
function formatDateForCaption(dateStr: string): string {
    // 例: '2025-12-24' や ISO 文字列を想定
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    const yyyy = d.getFullYear();
    const mm = (d.getMonth() + 1).toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    return `${yyyy}/${mm}/${dd}`;
}
