npx create-next-app@latest 

npm run dev 

```ts
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json());
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
const App = () => {
    const { data, error, mutate } = useSWR<Post[]>('https://jsonplaceholder.typicode.com/posts', fetcher);
    if (!data) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <></>
    )
}
```
this is a route group (pages) parentheses create a route group