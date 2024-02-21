import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import InputField from "./InputField";
import CusButton from "./CusButton";
import GenderPick from "./GenderPick";
import DatePicker from "./DatePicker";
import { FontColors, RegLog, fonts, form } from "../constants";
import dayjs from "dayjs";
import { DateType } from "react-native-ui-datepicker";

import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';


const Form = () => {

  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [pass, setPass] = useState("");
  const [gender, setGender] = useState("");
  const [selectedDate, setSelectedDate] = useState<DateType>(dayjs());

  const loginNavi = () => {
    //Navigate.navigate("Login");
  };

  const handleDateChange = (date: DateType) => {
    setSelectedDate(date);
  };

  const validateNum = (num: string) => {
    if (num.length < 5) {
      console.log("Phone number is too short");
      return false;
    } else {
      return true;
    }
  };

  const emptyFields = (
    num: string,
    name: string,
    password: string,
    gender: string
  ) => {
    if (!num || !name || !password || !gender) {
      console.log("Please fill all fields");
      return false;
    } else {
      return true;
    }
  };

  const handleNumChange = (text: string) => {
    setNum(text);
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handlePassChange = (text: string) => {
    setPass(text);
  };

  const handleSubmit = () => {
    if (!validateNum(num) || !emptyFields(num, name, pass, gender)) {
      {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "please fill all details correctly",
          button: "close",
        });
      }
    } else {
      console.log("Form submitted successfully");
      console.log(
        `Name: ${name}, Phone: ${num}, Password:${pass}, gender:${gender}, date:${selectedDate}`
      );
      SecureStore.setItemAsync("token", "12345")
      .then(() => {
        console.log("Token stored successfully");
        navigation.navigate("Main");
      })
      .catch(error => {
        console.error("Error storing token:", error);
        // Handle error
      });
    }
  };

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
  };

  return (
    <View style={form.layout}>
      <InputField
        onChangeText={handleNumChange}
        icon="phone"
        placeholder="Enter Your Phone"
        keyBrdTyp="numeric"
        secure={false}
        maxLength={11}
      />
      <InputField
        onChangeText={handleNameChange}
        icon="user"
        placeholder="Enter Your Name"
        keyBrdTyp="default"
        secure={false}
        maxLength={50}
      />
      <InputField
        onChangeText={handlePassChange}
        icon="lock"
        placeholder="Enter Your Password"
        keyBrdTyp="default"
        secure={true}
      />
      <GenderPick onGenderChange={handleGenderChange} />
      <DatePicker onDateChange={handleDateChange} />
      <CusButton btnText="Register" onPress={handleSubmit}></CusButton>
      <View style={RegLog.onPressStyle}>
        <Text style={[fonts.normal, FontColors.primaryFont]}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[fonts.normal, FontColors.blue]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Form;
