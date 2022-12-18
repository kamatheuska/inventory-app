import Link from 'next/link'
import styles from './navbar.module.css'

export default function Navbar() {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <Link href="/">
          Inventory App
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/storage">Storage</Link>
        <Link href="/ingredients">Ingredients</Link>
      </nav>

    </div>
  )
}