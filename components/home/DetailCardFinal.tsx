import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontColors, MenuStyle, fonts } from "../../constants";
import Data from "../../Data";

const cardWidth = Dimensions.get("screen").width * 0.43;
const docCardWidth = cardWidth * 2 + 30;

const DetailCardFinal = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0); // State to manage activeSlide
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Image
            source={item.drImage}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <View>
            <Text style={[fonts.headingSmall, FontColors.primaryDark]}>
              {item.drName}
            </Text>
            <Text style={[fonts.sub, FontColors.primaryFont]}>
              {item.drQual}
            </Text>
          </View>
        </View>
        <FlatList
          data={item.clinics}
          horizontal
          pagingEnabled
          decelerationRate="normal"
          snapToAlignment="center"
          removeClippedSubviews={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={1}
          renderItem={({ item: clinic }) => (
            <View
              style={{
                marginHorizontal: 10,
                width: docCardWidth - 20
              }}
            >
              <Text style={[fonts.subBold, FontColors.primaryDark]}>
                Clinic Name:
              </Text>
              <Text style={[fonts.sub, FontColors.primaryFont]}>
                {clinic.clinicName}
              </Text>
              <Text style={[fonts.subBold, FontColors.primaryDark]}>
                Address:
              </Text>
              <Text style={[fonts.sub, FontColors.primaryFont]}>
                {clinic.clinicAddress}
              </Text>
              <Text style={[fonts.subBold, FontColors.primaryDark]}>Fees:</Text>
              <Text style={[fonts.sub, FontColors.primaryFont]}>
                {clinic.clinicFees}
              </Text>
              <Text style={[fonts.subBold, FontColors.primaryDark]}>
                Timings:
              </Text>
              <Text style={[fonts.sub, FontColors.primaryFont]}>
                {clinic.clinicTimings}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    width: ((docCardWidth - 20)/2)-5,
                    backgroundColor: "#0ab99c",
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={[fonts.subBold, FontColors.whiteFont]}>
                    Book
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    width: ((docCardWidth - 20)/2)-5,
                    backgroundColor: "#0ab99c",
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={[fonts.subBold, FontColors.whiteFont]}>
                    Directions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(clinic) => clinic.clinicName}
          onScroll={({ nativeEvent }) => {
            const xOffset = nativeEvent.contentOffset.x;
            const index = Math.round(xOffset / docCardWidth);
            setActiveSlide(index);
          }}
        />
        <View style={MenuStyle.paginationContainer}>
          {item.clinics.map((clinic: any, index: number) => (
            <View
              key={clinic.clinicName}
              style={[
                MenuStyle.paginationDot,
                index === activeSlide ? MenuStyle.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        width: docCardWidth,
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 5,
        padding: 10,
      }}
    >
      <Text style={[fonts.heading, FontColors.primaryDark]}>
        Well Known Doctors
      </Text>
      <FlatList
        data={Data}
        decelerationRate={"fast"}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        removeClippedSubviews={true}
        initialNumToRender={1}
        pagingEnabled
        snapToAlignment="start"
      />
    </View>
  );
};

export default DetailCardFinal;