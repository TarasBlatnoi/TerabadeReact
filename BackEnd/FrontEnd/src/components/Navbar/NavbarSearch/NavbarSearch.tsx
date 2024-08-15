import styles from "./NavbarSearch.module.css"

const NavbarSearch = () => {
  return (
    <>
      <label htmlFor="search" className={styles.visuallyHidden}>
        Search
      </label>
      <input
        type="search"
        id="search"
        className={styles.search}
        name="search"
        placeholder="Пошук"
      />
    </>
  )
}

export default NavbarSearch
