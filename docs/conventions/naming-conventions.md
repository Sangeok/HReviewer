# 함수 네이밍 컨벤션

> 작성일: 2025-01-01
> 최종 수정일: 2026-01-01
> 버전: 1.1
> 적용 범위: 전체 프로젝트

## 목차

1. [개요](#개요)
2. [기본 원칙](#기본-원칙)
3. [함수 네이밍 규칙](#함수-네이밍-규칙)
4. [파일 및 폴더 네이밍](#파일-및-폴더-네이밍)
5. [변수 네이밍](#변수-네이밍)
6. [상수 네이밍](#상수-네이밍)
7. [타입 및 인터페이스 네이밍](#타입-및-인터페이스-네이밍)
8. [실제 예제](#실제-예제)

---

## 개요

본 문서는 HReviewer 프로젝트의 일관된 코드 작성을 위한 네이밍 컨벤션을 정의합니다.

### 핵심 목표

- **일관성**: 프로젝트 전체에서 동일한 네이밍 패턴 사용
- **명확성**: 이름만으로 함수/변수의 역할을 파악 가능
- **예측 가능성**: 유사한 기능은 유사한 네이밍 패턴 사용

---

## 기본 원칙

### 케이스 스타일

| 항목 | 케이스 | 예시 |
|------|--------|------|
| 파일명 | kebab-case | `user-profile.tsx`, `get-dashboard-stats.ts` |
| 폴더명 | kebab-case | `app-sidebar/`, `user-settings/` |
| 함수/변수 | camelCase | `getUserRepositories`, `totalRepos` |
| 컴포넌트 | PascalCase | `RepositoryList`, `AppSidebar` |
| 타입/인터페이스 | PascalCase | `DashboardStats`, `Repository` |
| 상수 | UPPER_SNAKE_CASE | `MAX_PAGE_SIZE`, `DEFAULT_TIMEOUT` |
| 데이터베이스 테이블/필드 | snake_case | `created_at`, `user_id` |

### 명명 원칙

1. **의미 있는 이름**: 약어 사용 최소화, 명확한 의미 전달
2. **동사 우선**: 함수는 동작을 표현하는 동사로 시작
3. **일관된 어휘**: 같은 개념에는 같은 단어 사용
4. **간결함**: 불필요하게 길지 않게 (2-4 단어 권장)

---

## 함수 네이밍 규칙

### 1. React 훅 (Hooks)

**규칙**: `use` 접두사 사용

```typescript
// ✅ 좋은 예
function useRepositories() { ... }
function useConnectRepository() { ... }
function useSession() { ... }
function useDashboardStats() { ... }

// ❌ 나쁜 예
function repositories() { ... }          // use- 접두사 누락
function getRepositories() { ... }       // 훅이 아닌 일반 함수 네이밍
function hookRepositories() { ... }      // 비표준 접두사
```

**위치**: `module/*/hooks/`

### 2. 서버 액션 (Server Actions)

**함수 선언 방식**: `export async function` 권장 (Next.js 15+ 공식 패턴)

```typescript
// ✅ 권장 (function 선언)
export async function getUserRepositories(page: number) { ... }

// ⚠️ 허용되지만 비권장 (const 화살표 함수)
export const getUserRepositories = async (page: number) => { ... }

// ❌ 나쁜 예
function getUserRepositories(page: number) { ... }  // export 누락
const getUserRepositories = (page: number) => { ... }  // async 누락
```

**선택 이유:**
- 호이스팅 지원으로 순환 참조 문제 방지
- 디버깅 시 스택 트레이스 명확
- Next.js 공식 문서 권장 패턴
- TypeScript 타입 추론 우수

#### 2.1 데이터 조회 (Read)

**규칙**: `get` 접두사 사용

```typescript
// ✅ 좋은 예
export async function getUserRepositories(page: number, perPage: number) { ... }
export async function getDashboardStats() { ... }
export async function getRepositoryById(id: string) { ... }
export async function getMonthlyActivity() { ... }

// ❌ 나쁜 예
export async function fetchRepositories() { ... }      // fetch 대신 get 사용
export async function repositories() { ... }           // 동사 누락
export async function retrieveRepositories() { ... }   // 비표준 동사
```

#### 2.2 데이터 생성 (Create)

**규칙**: `create` 접두사 사용

```typescript
// ✅ 좋은 예
export async function createReview(data: ReviewInput) { ... }
export async function createWebhook(owner: string, repo: string) { ... }
export async function createRepository(data: RepositoryInput) { ... }

// ❌ 나쁜 예
export async function addReview() { ... }          // add 대신 create 사용
export async function newReview() { ... }          // new 대신 create 사용
export async function insertReview() { ... }       // DB 용어 노출
```

#### 2.3 데이터 수정 (Update)

**규칙**: `update` 접두사 사용

```typescript
// ✅ 좋은 예
export async function updateReview(id: string, data: Partial<Review>) { ... }
export async function updateUserSettings(settings: UserSettings) { ... }

// ❌ 나쁜 예
export async function modifyReview() { ... }       // modify 대신 update 사용
export async function changeReview() { ... }       // change 대신 update 사용
export async function editReview() { ... }         // edit 대신 update 사용
```

#### 2.4 데이터 삭제 (Delete)

**규칙**: `delete` 접두사 사용

```typescript
// ✅ 좋은 예
export async function deleteReview(id: string) { ... }
export async function deleteWebhook(hookId: number) { ... }

// ❌ 나쁜 예
export async function removeReview() { ... }       // remove 대신 delete 사용
export async function destroyReview() { ... }      // destroy 대신 delete 사용
```

#### 2.5 비즈니스 로직 (Business Logic)

**규칙**: 명확한 동사 사용

```typescript
// ✅ 좋은 예
export async function connectRepository(owner: string, repo: string) { ... }
export async function disconnectRepository(id: string) { ... }
export async function reviewPullRequest(owner: string, repo: string, prNumber: number) { ... }
export async function syncRepositoryData(repoId: string) { ... }

// ❌ 나쁜 예
export async function repository() { ... }         // 동사 누락
export async function doConnect() { ... }          // 불필요한 do 접두사
export async function handleRepository() { ... }   // handle은 이벤트 핸들러용
```

**위치**: `module/*/actions/`

### 3. 이벤트 핸들러

**규칙**: `handle` 또는 `on` 접두사 사용

```typescript
// ✅ 좋은 예
function handleClick() { ... }
function handleSubmit(event: FormEvent) { ... }
function onConnect(repo: Repository) { ... }
function onDisconnect(repo: Repository) { ... }

// ❌ 나쁜 예
function click() { ... }                    // handle/on 접두사 누락
function doClick() { ... }                  // do 대신 handle 사용
function clickHandler() { ... }             // 접미사 대신 접두사 사용
```

### 4. 유틸리티 함수

**규칙**: 명확한 동사 사용, 모듈별로 그룹화

```typescript
// ✅ 좋은 예
function formatDate(date: Date): string { ... }
function validateEmail(email: string): boolean { ... }
function parseGitHubUrl(url: string): { owner: string; repo: string } { ... }
function generateRandomId(): string { ... }

// ❌ 나쁜 예
function date(d: Date) { ... }              // 동사 누락
function checkEmail(email: string) { ... }  // check 대신 validate 사용
function utils() { ... }                    // 의미 없는 이름
```

**위치**: `lib/utils/`

### 5. Helper 함수 (내부 전용)

**규칙**: `function` 선언 권장, 파일 내부에서만 사용 (export하지 않음)

```typescript
// ✅ 권장 (function 선언 - 호이스팅 지원)
function initializeMonthlyData(): Record<string, MonthlyStats> { ... }
function generateSampleReviews(): { createdAt: Date }[] { ... }
function aggregateContributions(weeks: ContributionWeek[]): number { ... }

// ⚠️ 허용 (const 화살표 함수 - 선언 순서 중요)
const initializeMonthlyData = (): Record<string, MonthlyStats> => { ... }

// ❌ 나쁜 예
const helper = () => { ... }                // 의미 없는 이름
function _privateHelper() { ... }           // 언더스코어 접두사 불필요 (TypeScript private 사용)
```

**위치**: 각 모듈 파일 내부 (export하지 않음)

**선택 이유:**
- 호이스팅으로 함수 순서 자유롭게 배치 가능
- 다른 helper 함수에서 상호 참조 시 유리
- 디버깅 시 스택 트레이스 명확

### 6. API 라우트 핸들러

**규칙**: HTTP 메서드명 사용 (대문자)

```typescript
// ✅ 좋은 예 (app/api/webhooks/github/route.ts)
export async function POST(request: Request) { ... }
export async function GET(request: Request) { ... }
export async function PUT(request: Request) { ... }
export async function DELETE(request: Request) { ... }

// ❌ 나쁜 예
export async function handler() { ... }    // 메서드명 대신 handler 사용
export async function post() { ... }       // 소문자 사용
```

**위치**: `app/api/**/route.ts`

---

## 파일 및 폴더 네이밍

### 1. 파일명

#### 컴포넌트 파일

```
// ✅ 좋은 예
app-sidebar.tsx
repository-list.tsx
user-profile.tsx

// ❌ 나쁜 예
AppSidebar.tsx              // PascalCase 대신 kebab-case 사용
repositoryList.tsx          // camelCase 대신 kebab-case 사용
```

#### 서버 액션 파일

```
// ✅ 좋은 예
get-dashboard-stats.ts
get-monthly-activity.ts
create-review.ts

// ❌ 나쁜 예
getDashboardStats.ts        // camelCase 대신 kebab-case 사용
dashboard_stats.ts          // snake_case 대신 kebab-case 사용
```

#### 훅 파일

```
// ✅ 좋은 예
use-repositories.ts
use-connect-repository.ts

// ❌ 나쁜 예
useRepositories.ts          // camelCase 대신 kebab-case 사용
repositories-hook.ts        // 접미사 대신 접두사 사용
```

### 2. 폴더명

#### 모듈 구조

```
module/
├── auth/                   ✅ kebab-case
├── repository/            ✅ 단수형
├── dashboard/             ✅ 명확한 의미
└── user-settings/         ✅ 복합어는 하이픈으로 연결

❌ 나쁜 예:
├── Auth/                  // PascalCase
├── repositories/          // 복수형
├── dash/                  // 불명확한 약어
```

#### 기능별 하위 폴더

**표준 폴더 구조** (모든 모듈에 일관되게 적용):

```
module/[feature]/
├── actions/               # 서버 액션
├── hooks/                 # React 훅
├── ui/                    # UI 컴포넌트
│   ├── [component].tsx
│   └── parts/            # 서브 컴포넌트
├── types/                # TypeScript 타입
├── constants/            # 상수 정의
└── lib/                  # 유틸리티 (선택적)
```

---

## 변수 네이밍

### 1. 일반 변수

**규칙**: camelCase, 명확한 의미

```typescript
// ✅ 좋은 예
const totalRepos = 30;
const userName = "john_doe";
const isConnected = true;
const createdAt = new Date();

// ❌ 나쁜 예
const total = 30;                   // 불명확
const name = "john_doe";            // 너무 일반적
const connected = true;             // is 접두사 누락
const created = new Date();         // 불완전
```

### 2. Boolean 변수

**규칙**: `is`, `has`, `should`, `can` 접두사 사용

```typescript
// ✅ 좋은 예
const isLoading = false;
const hasError = false;
const shouldUpdate = true;
const canConnect = true;
const isConnected = repo.status === 'connected';

// ❌ 나쁜 예
const loading = false;              // 접두사 누락
const error = false;                // 접두사 누락
const update = true;                // 접두사 누락
```

### 3. 배열/컬렉션

**규칙**: 복수형 사용

```typescript
// ✅ 좋은 예
const repositories = [];
const users = [];
const reviewItems = [];
const connectedRepoIds = new Set();

// ❌ 나쁜 예
const repository = [];              // 단수형
const userList = [];                // List 접미사 불필요
const repoArray = [];               // Array 접미사 불필요
```

### 4. 함수 매개변수

**규칙**: camelCase, 간결하고 명확하게

```typescript
// ✅ 좋은 예
function getUserRepositories(page: number, perPage: number) { ... }
function createReview(owner: string, repo: string, prNumber: number) { ... }

// ❌ 나쁜 예
function getUserRepositories(p: number, pp: number) { ... }      // 약어
function createReview(repoOwner: string, repoName: string) { ... } // 중복 접두사
```

---

## 상수 네이밍

### 1. 전역 상수

**규칙**: UPPER_SNAKE_CASE

```typescript
// ✅ 좋은 예 (lib/constants.ts)
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_TIMEOUT = 5000;
export const API_BASE_URL = "https://api.example.com";
export const SAMPLE_REVIEW_COUNT = 45;

// ❌ 나쁜 예
export const maxPageSize = 100;         // camelCase
export const MaxPageSize = 100;         // PascalCase
export const max_page_size = 100;       // lowercase snake_case
```

### 2. Enum-like 객체

**규칙**: 객체명은 PascalCase, 키는 UPPER_SNAKE_CASE

```typescript
// ✅ 좋은 예
const ContributionLevel = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

const MonthNames = {
  JANUARY: "Jan",
  FEBRUARY: "Feb",
  MARCH: "Mar",
} as const;

// ❌ 나쁜 예
const CONTRIBUTION_LEVEL = { ... }      // 전부 대문자
const contributionLevel = { ... }       // camelCase
```

### 3. 모듈 내부 상수

**규칙**: UPPER_SNAKE_CASE, 파일 최상단에 정의

```typescript
// ✅ 좋은 예 (module/dashboard/actions/get-monthly-activity.ts)
const MONTH_NAMES = ["Jan", "Feb", "Mar", ...];
const SAMPLE_REVIEW_COUNT = 45;
const DAYS_RANGE = 180;

// ❌ 나쁜 예
const monthNames = ["Jan", "Feb", ...];     // camelCase
const MONTHS = ["Jan", "Feb", ...];         // 불명확한 이름
```

---

## 타입 및 인터페이스 네이밍

### 1. 인터페이스

**규칙**: PascalCase, 명확한 명사

```typescript
// ✅ 좋은 예
interface DashboardStats { ... }
interface ContributionData { ... }
interface Repository { ... }
interface User { ... }

// ❌ 나쁜 예
interface IDashboardStats { ... }      // I 접두사 불필요
interface dashboardStats { ... }       // camelCase
interface Stats { ... }                // 불명확
```

### 2. Type Alias

**규칙**: PascalCase

```typescript
// ✅ 좋은 예
type RepositoryWithReviews = Repository & { reviews: Review[] };
type ReviewStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
type ApiResponse<T> = { success: boolean; data?: T };

// ❌ 나쁜 예
type repositoryWithReviews = ...;      // camelCase
type RepoReviews = ...;                // 불명확한 약어
```

### 3. Props 인터페이스

**규칙**: `[Component]Props` 형식

```typescript
// ✅ 좋은 예
interface RepositoryListProps {
  repositories: Repository[];
  onConnect: (repo: Repository) => void;
}

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// ❌ 나쁜 예
interface IRepositoryListProps { ... }     // I 접두사 불필요
interface RepositoryListProperties { ... } // Props 대신 Properties
interface Props { ... }                     // 너무 일반적
```

### 4. Enum

**규칙**: PascalCase (Enum명), UPPER_SNAKE_CASE (값)

```typescript
// ✅ 좋은 예
enum ReviewStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

// ❌ 나쁜 예
enum reviewStatus { ... }              // camelCase
enum REVIEW_STATUS { ... }             // 전부 대문자
enum ReviewStatus {
  pending = "pending",                 // lowercase
}
```

---

## 실제 예제

### 예제 1: Repository 모듈

```typescript
// ✅ module/repository/actions/index.ts
export async function getUserRepositories(page: number, perPage: number) { ... }
export async function connectRepository(owner: string, repo: string) { ... }
export async function disconnectRepository(id: string) { ... }

// ✅ module/repository/hooks/use-repositories.ts
export function useRepositories() { ... }
export function useConnectRepository() { ... }

// ✅ module/repository/ui/repository-list.tsx
export default function RepositoryList({ repositories }: RepositoryListProps) { ... }

// ✅ module/repository/types/index.ts
export interface Repository { ... }
export interface RepositoryWithReviews extends Repository { ... }
export type RepositoryStatus = "connected" | "disconnected";
```

### 예제 2: Dashboard 모듈

```typescript
// ✅ module/dashboard/actions/get-dashboard-stats.ts
const SAMPLE_REPO_COUNT = 30;
const SAMPLE_REVIEW_COUNT = 44;

export interface DashboardStats {
  totalRepos: number;
  totalContributions: number;
  totalPRs: number;
  totalReviews: number;
}

export async function getDashboardStats(): Promise<DashboardStats> { ... }

// ✅ module/dashboard/actions/get-monthly-activity.ts
const MONTH_NAMES = ["Jan", "Feb", "Mar", ...];

function initializeMonthlyData(): Record<string, MonthlyStats> { ... }
function generateSampleReviews(): { createdAt: Date }[] { ... }

export async function getMonthlyActivity(): Promise<MonthlyActivity[]> { ... }
```

### 예제 3: GitHub 모듈

```typescript
// ✅ module/github/lib/github.ts
function createOctokitClient(token: string): Octokit { ... }

export async function getGithubAccessToken() { ... }
export async function getRepositories(page: number, perPage: number) { ... }
export async function createWebhook(owner: string, repo: string) { ... }
export async function deleteWebhook(owner: string, repo: string, hookId: number) { ... }
export async function fetchUserContribution(token: string, username: string) { ... }
```

### 예제 4: 컴포넌트

```typescript
// ✅ components/app-sidebar/ui/app-sidebar.tsx
interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={...}>
      <Logo />
      <Navigation onItemClick={handleNavigationClick} />
      <UserProfile />
    </aside>
  );
}
```

---

## 체크리스트

코드 작성 시 다음 항목을 확인하세요:

### 함수
- [ ] React 훅은 `use` 접두사 사용
- [ ] 서버 액션은 `export async function` 패턴 사용 (권장)
- [ ] 데이터 조회는 `get` 접두사 사용
- [ ] CRUD 작업은 `create`, `update`, `delete` 접두사 사용
- [ ] 이벤트 핸들러는 `handle` 또는 `on` 접두사 사용
- [ ] Helper 함수는 `function` 선언 권장 (호이스팅 지원)

### 변수
- [ ] Boolean 변수는 `is`, `has`, `should`, `can` 접두사 사용
- [ ] 배열/컬렉션은 복수형 사용
- [ ] 의미 있는 이름 사용 (약어 최소화)

### 파일/폴더
- [ ] 파일명은 kebab-case 사용
- [ ] 폴더명은 kebab-case 사용
- [ ] 표준 폴더 구조 준수 (`actions/`, `hooks/`, `ui/`, `types/`, `constants/`)

### 타입
- [ ] 인터페이스/타입은 PascalCase 사용
- [ ] Props 인터페이스는 `[Component]Props` 형식
- [ ] Enum 값은 UPPER_SNAKE_CASE 사용

### 상수
- [ ] 전역 상수는 UPPER_SNAKE_CASE 사용
- [ ] Enum-like 객체 키는 UPPER_SNAKE_CASE 사용

---

## 참고 자료

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React Naming Conventions](https://reactjs.org/docs/hooks-rules.html)
- [TypeScript Coding Guidelines](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 |
|------|------|-----------|
| 2025-01-01 | 1.0 | 초안 작성 |
| 2026-01-01 | 1.1 | 서버 액션 함수 선언 방식 명확화 (`export async function` 권장), Helper 함수 가이드 개선, 체크리스트 업데이트 |
