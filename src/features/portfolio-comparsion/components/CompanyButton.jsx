import React from 'react'
import styles from '../styles/index.module.css'
const CompanyButton = ({selectedCompanies,setSelectedCompanies,item}) => {
  return (
    <button
    onClick={() => {
      if (selectedCompanies.includes(item.name)) {
        setSelectedCompanies(
          selectedCompanies.filter((company) => company !== item.name)
        );
      } else {
        setSelectedCompanies([...selectedCompanies, item.name]);
      }
    }}
    className={`${styles.companies_container_button} ${
      selectedCompanies.includes(item.name)
        ? styles.companies_button_clicked
        : ""
    }`}
  >
    {item.name}
  </button>
  )
}

export default CompanyButton