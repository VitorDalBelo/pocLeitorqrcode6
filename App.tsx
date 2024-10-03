import React, { useState, useRef } from "react";
import { View, StyleSheet, Button } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [qrCodeValue, setQrCodeValue] = useState("Texto para QR Code");
  const svgRef = useRef<any>();

  async function shareQrcode() {
    // Converta o QR code gerado em PNG (como uma string de dados base64)
    if(svgRef.current === undefined)return null;
    svgRef.current.toDataURL(async (dataURL:any) => {
      try {
        // Crie um caminho temporário para salvar a imagem convertida
        const fileUri = FileSystem.cacheDirectory + "qrcode.png";

        // Salve a imagem temporariamente
        await FileSystem.writeAsStringAsync(fileUri, dataURL, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Compartilhe a imagem
        await Sharing.shareAsync(fileUri);
      } catch (error) {
        console.log("Erro ao compartilhar:", error);
      }
    });
  }

  return (
    <View style={styles.container}>
      {/* Gerador de QR Code */}
      <QRCode
        value={qrCodeValue}
        size={200}
        getRef={(c) => (svgRef.current = c)}
      />

      <Button title={"Compartilhar QR Code"} onPress={shareQrcode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
