import React, { useState, useEffect } from 'react';
import { 
  PermissionsAndroid, 
  Platform,
} from 'react-native';
import { Text, VStack } from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

interface Location {
    latitude: number;
    longitude: number;
  }
  

// Fungsi untuk meminta izin lokasi di Android
const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Izin Lokasi",
          message: "Aplikasi membutuhkan akses lokasi Anda",
          buttonNeutral: "Tanya Nanti",
          buttonNegative: "Batalkan",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

// Hook kustom untuk mendapatkan lokasi
const useUserLocation = () => {
    const [location, setLocation] = useState<Location>();
    const [error, setError] = useState("");
    const [city, setCity] = useState()
  
    useEffect(() => {
      const fetchLocation = () => {
        // Metode pertama: Geolocation
        Geolocation.getCurrentPosition(
          async (position) => {
            setLocation(position.coords);

            const {latitude, longitude} = position.coords

            try {
                const response = await axios.get(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
                );
    
                const cityName = 
                  response.data.address.city || 
                  response.data.address.town || 
                  response.data.address.village || 
                  'Kota Tidak Dikenal';
                
                setCity(cityName);
              } catch (geoError) {
                console.error('Gagal mendapatkan nama kota:', geoError);
                setError('Gagal mendapatkan nama kota');
              }
          },
          (err) => {
            // Jika Geolocation gagal, coba metode fallback
            if (err.code === 3) { // Timeout
              console.log('Geolocation timeout, mencoba metode alternatif');
              
              // Fallback 1: Gunakan lokasi terakhir yang tersimpan
              Geolocation.getLastKnownLocation()
                .then((lastLocation) => {
                  if (lastLocation) {
                    setLocation(lastLocation.coords);
                  } else {
                    // Fallback 2: Gunakan lokasi default
                    setLocation({
                      latitude: -6.200000, // Contoh: koordinat Jakarta
                      longitude: 106.816666
                    });
                  }
                })
                .catch((fallbackError) => {
                  // Fallback 3: Lokasi default
                  setLocation({
                    latitude: -6.200000,
                    longitude: 106.816666
                  });
                  setError('Gagal mendapatkan lokasi');
                });
            } else {
              setError(err.message);
            }
          },
          { 
            enableHighAccuracy: false, 
            timeout: 30000, 
            maximumAge: 10000 
          }
        );
      };
  
      fetchLocation();
    }, []);
  
    return { location, error, city };
  };

// Contoh komponen menggunakan hook lokasi
const LocationComponent = () => {
  const { location, error, city } = useUserLocation();

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!location) {
    return <Text>Mengambil lokasi...</Text>;
  }

  return (
    <VStack space={2}>
      <Text>Latitude: {location.latitude}</Text>
      <Text>Longitude: {location.longitude}</Text>
      <Text>Longitude: {city}</Text>
    </VStack>
  );
};

export default LocationComponent;

export { useUserLocation }