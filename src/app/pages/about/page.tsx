import Image from "next/image";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Ліва частина */}
      <div className={styles.left}>
        <p className={styles.orangeText}>How It Started</p>
        <h2 className={styles.title}>
          Our Dream is <br />
          Global Learning <br />
          Transformation
        </h2>
        <p className={styles.text}>
          Kawuh was founded by Robert Anderson, a passionate lifelong learner,
          and Maria Sanchez, a visionary educator. Their shared dream was to create
          a digital haven of knowledge accessible to all. United by their belief in
          the transformational power of education, they embarked on a journey to
          build Kawuh. With relentless dedication, they gathered a team of experts
          and launched this innovative platform, creating a global community of
          eager learners, all connected by the desire to explore, learn, and grow.
        </p>
      </div>

      {/* Права частина */}
      <div className={styles.right}>
        <Image
          src="https://i.pinimg.com/736x/cc/cc/38/cccc381bd75a63730f22b094efb6ed46.jpg"
          alt="People learning"
          width={400}
          height={300}
          className={styles.image}
        />

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <p className={styles.statValue}>3.5</p>
            <p className={styles.statLabel}>Years Experience</p>
          </div>
          <div className={styles.statBox}>
            <p className={styles.statValue}>23</p>
            <p className={styles.statLabel}>Project Challenge</p>
          </div>
          <div className={styles.statBox}>
            <p className={styles.statValue}>830+</p>
            <p className={styles.statLabel}>Positive Reviews</p>
          </div>
          <div className={styles.statBox}>
            <p className={styles.statValue}>100K</p>
            <p className={styles.statLabel}>Trusted Students</p>
          </div>
        </div>
      </div>
    </div>
  );
}