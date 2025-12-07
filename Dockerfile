FROM amazonlinux:2023

# タイムゾーンなど必要ならここで設定してもOK
# ENV TZ=Asia/Tokyo

# 必要パッケージインストール
# - git, curl, unzip: 基本ツール
# - tar, gzip: n や nodeインストールで使用
# - bash: シェル
# - gcc, g++, make: ネイティブビルド用（sharpなど）
# - openssl-devel, zlib-devel, libpng-devel, vips-devel: 画像系（sharp向け）
RUN dnf update -y
RUN dnf install -y git
RUN dnf install -y unzip
RUN dnf install -y tar
RUN dnf install -y gzip
RUN dnf install -y bash
RUN dnf install -y gcc
RUN dnf install -y g++
RUN dnf install -y make
RUN dnf install -y openssl-devel
RUN dnf install -y zlib-devel
RUN dnf install -y libpng-devel
RUN dnf clean all

# ==== Node.js 22 をインストール（n 経由） ====
# Amazon Linux 2023 には Node が入っていないので、自前でセットアップ
RUN curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n -o /usr/local/bin/n \
  && chmod +x /usr/local/bin/n \
  && n 22 \
  && ln -sf /usr/local/bin/node /usr/bin/node \
  && ln -sf /usr/local/bin/npm /usr/bin/npm \
  && ln -sf /usr/local/bin/npx /usr/bin/npx

# ==== AWS CLI v2 インストール ====
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
  && unzip awscliv2.zip \
  && ./aws/install -i /usr/local/aws-cli -b /usr/local/bin \
  && rm -rf aws awscliv2.zip

# ==== Amplify CLI (グローバル) ====
RUN npm install -g @aws-amplify/cli \
  && amplify -v

# ==== 作業ユーザー作成 ====
# デフォルト root だと色々危ないので、通常ユーザーで作業
RUN useradd -m dev \
  && echo "dev ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER dev
WORKDIR /home/dev/app

# コンテナ内でよく使うポートを開けておく（必要に応じて）
# Next.js dev server: 3000
# Strapi local: 1337 など（今回はAmplify用なのでコメントアウトでもOK）
EXPOSE 3000

# デフォルトのシェル
CMD ["/bin/bash"]
 