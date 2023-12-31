# 概要

個人的な学習記録用のリポジトリです。  
以下の構成で ToDo アプリを作成して、T3 Stack を学びました。

- Next.js
  - API Route を利用してバックエンドを実装
- tRPC
- Tailwind CSS
- TypeScript
- Prisma
- NextAuth.js

また、ローカル環境では Docker を用いて Postgres DB の環境を構築してます。

## DEMO

https://learn-t3stack-development-todo-app.vercel.app/

# MEMO

## Prisma

```
npx prisma studio
```

## .env

### DATABASE_URL

```
DATABASE_URL=postgresql://udemy:udemy@localhost:5434/udemy?schema=public
```

### NEXTAUTH_SECRET

`openssl rand -base64 32` で生成したトークンを入力

```
NEXTAUTH_SECRET={ここに入力}
```

### NEXTAUTH_URL

```
NEXTAUTH_URL=http://localhost:3000
```

## GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET

GitHub の [New OAuth App](https://github.com/settings/developers) から以下を設定。

- Application name: 任意のアプリ名
- Homepage URL: http://localhost:3000
- Authorization callback URL: http://localhost:3000/api/auth/callback/github

上記を設定後、「Client ID」と「Client secrets」を取得し、それぞれ入力する。

```
GITHUB_CLIENT_ID={Client ID}
GITHUB_CLIENT_SECRET={Client secrets}
```
