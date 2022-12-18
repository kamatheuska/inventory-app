
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'

import styles from './layout.module.css'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}