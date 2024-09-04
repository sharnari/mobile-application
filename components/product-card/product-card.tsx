import { React, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images_ids: string;
    created_at: string;
    updated_at: string;
    condition: string;
    packaging: string;
    specifications: string;
    manufacturer: string;
    pickup_point: string;
    reservation: boolean;
    discount: number;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [imageError, setImageError] = useState(false);
    const removeHtmlTags = (html: string): string => {
        return html.replace(/<[^>]*>/g, '');
    };
    const baseUrl = 'http://62.109.21.134:5199/image/';
    return (
        <View style={styles.card}>
            {product.images_ids.length > 0 && !imageError ? (
                <Image source={{ uri: baseUrl + product.images_ids[0] }}
                    style={styles.image}
                    onError={() => setImageError(true)}
                />
            ) : (
                <Text style={styles.errorText}>no image</Text>
            )}
            <Text style={styles.title}>name: {product.name}</Text>
            <Text style={styles.title}>price: {product.price.toFixed(2)}$</Text>
            <Text style={styles.title}>description: {removeHtmlTags(product.description)}</Text>
            <Text style={styles.title}>created at: {product.created_at}</Text>
            <Text style={styles.title}>updated at: {product.updated_at}</Text>
            <Text style={styles.title}>condition: {product.condition}</Text>
            <Text style={styles.title}>packaging: {product.packaging}</Text>
            <Text style={styles.title}>specifications: {product.specifications}</Text>
            <Text style={styles.title}>manufacturer: {product.manufacturer}</Text>
            <Text style={styles.title}>pickup_point: {product.pickup_point}</Text>
            <Text style={styles.title}>reservation: {product.reservation}</Text>
            <Text style={styles.title}>discount: {product.discount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
    }
});

export default ProductCard;