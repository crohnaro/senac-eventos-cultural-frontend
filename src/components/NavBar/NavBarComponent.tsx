import styles from './NavBar.module.css'

function NavBarComponent () {
    return (
        <div className={styles.menu}>
            <h1>Logo</h1>
            <a href='#'>Login</a>
        </div>
    )
}

export default NavBarComponent