
import styles from "./page.module.css";
import ContactForm from "@/app/components/ContactForm";

export default function ContactPage() {
  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>Let’s Get In Touch</h2>

      {/* Контактна інформація */}
      <div className={styles.contactGrid}>
        <div className={styles.contactItem}>
          <p className={styles.contactIcon}>📞</p>
          <p>+123 45 789 000</p>
          <p>+123 45 189 000</p>
        </div>
        <div className={styles.contactItem}>
          <p className={styles.contactIcon}>📧</p>
          <p>inquiry@kawuh.ai</p>
          <p>help@kawuh.ai</p>
        </div>
        <div className={styles.contactItem}>
          <p className={styles.contactIcon}>📍</p>
          <p>22B Elementary Street</p>
          <p>New York, NY</p>
        </div>
      </div>

        <ContactForm></ContactForm>
      
    </div>
  );
}