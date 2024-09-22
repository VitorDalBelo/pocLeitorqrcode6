import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status  } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = (data: any) => {
    setScanned(true);
    console.log(data);
    alert(`Código de barras com tipo ${data.type} e dados ${data.data} foi escaneado!`);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para usar a câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Toque para escanear novamente"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
