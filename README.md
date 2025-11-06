# Cotam-Front

코드 탐정단 - 코드의 문제를 찾고, 토론하고, 고민하는 개발자들의 놀이터

## 기술 스택

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Tanstack Query
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **Linting**: Biome

## 시작하기

### 설치

````bash
pnpm install

### 개발 서버 실행

```bash
pnpm dev
````

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
pnpm run build
pnpm run start
```

## 환경 변수

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_ENV=development
```

## 스크립트

- `pnpm dev` - 개발 서버 실행
- `pnpm build` - 프로덕션 빌드
- `pnpm start` - 프로덕션 서버 실행
- `pnpm lint` - 린터 실행
- `pnpm format` - 코드 포맷팅

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router
├── components/       # React 컴포넌트
│   └── ui/          # UI 컴포넌트
├── hooks/           # 커스텀 훅
├── lib/             # 유틸리티 및 라이브러리
│   ├── api/         # API 클라이언트
│   ├── providers/   # Context Providers
│   └── validations/ # Zod 스키마
└── types/           # TypeScript 타입 정의
```

## 라이선스

MIT
