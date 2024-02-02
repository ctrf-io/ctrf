import React from 'react';
import Layout from '@theme/Layout';
import styles from './Card.module.css'; // Adjust the path as necessary


type CardProps = {
    image: string;
    name: string;
    description: string;
  };

  const Card: React.FC<CardProps> = ({ image, name, description }) => (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.cardImage} />
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
  

  const MyNewPage: React.FC = () => {
    const cardsData: CardProps[] = [
      { image: 'path/to/image1.jpg', name: 'Name 1', description: 'Description 1' },
      { image: 'path/to/image2.jpg', name: 'Name 2', description: 'Description 2' },
      { image: 'path/to/image1.jpg', name: 'Name 1', description: 'Description 1' },
      { image: 'path/to/image2.jpg', name: 'Name 2', description: 'Description 2' },
      { image: 'path/to/image1.jpg', name: 'Name 1', description: 'Description 1' },
      { image: 'path/to/image2.jpg', name: 'Name 2', description: 'Description 2' },
      // Add more card data here
    ];
  
    return (
        <Layout title="My New Page">
          <div className={styles.cardContainer}>
            {cardsData.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </Layout>
      );
    };
  
  export default MyNewPage;
  