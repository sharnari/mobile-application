import { Text, View, Button, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from 'react';
import ProductCard from '../components/product-card';

interface ConnectionStatusProps {
    status: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
    const getTextColor = (isConnected: boolean) => (isConnected ? 'green' : 'red');
    return (
        <Text style={{ color: getTextColor(status === 'connect'), fontSize: 16 }}>
            {status}
        </Text>
    );
};

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images_ids: string[];
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

export default function Index() {
    const [checkConnect, setCheckConnect] =  useState<string>('disconnect');
    const [products, setProducts] = useState<Product[]>(null);
    const [loading, setLoading] = useState<boolean>(false);
    // config
    const option: RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    };
    const linkChecker: string = `http://62.109.21.134:5199/bcb6dc91-a2b0-40b5-ab60-9c46dae84f54/ping`;
    const linkProduct: string = `http://62.109.21.134:5199/products`;
    // style
    const checkConnectStyle = (isTrue: string = 'disconnect'): string => {
        return isTrue === 'connect' ? 'green' : 'red';
    };
    // service
    const check = async (query: string) => {
        try{
            const res = await fetch(query, option);
            const data = await res.json();
            const success = data.success;
            setCheckConnect(success ? 'connect' : 'disconnect');
        } catch(error) {
            setCheckConnect(String(error));
        }
    }
    // service
    const getProducts = async (query: string) => {
        try {
            const res = await fetch(query, option);
            const data = await res.json();
            const productList = data.result.product_list;
            if (Array.isArray(productList)) {
                setProducts(productList);
            } else {
                console.error("Received data is not an array:", productList);
            }
        } catch(error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleButtonPress = () => {
        setLoading(true);
        getProducts(linkProduct);
    }

    useEffect(() => {
        const checkConnection = async () => {
            await check(linkChecker);
            setTimeout(checkConnection, 1000*60);
        }
        checkConnection();
        return () => {};
    }, []);

  return (
    <View style={{ flex: 1 }}>
                <ConnectionStatus status={checkConnect} />
                <View style={{ flex: 1 }}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <ProductCard product={item} />}
                            contentContainerStyle={styles.list}
                        />
                    )}
                </View>
                <View style={{ padding: 10 }}>
                    <Button title="Press Me" onPress={handleButtonPress} />
                </View>
            </View>
        );
}
const styles = StyleSheet.create({
    list: {
        paddingBottom: 20,
    },
});