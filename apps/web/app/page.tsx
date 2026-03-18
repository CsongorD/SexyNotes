import styles from './page.module.css';
import Editor from '@/components/editor/Editor';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Editor />
      </main>
    </div>
  );
}
