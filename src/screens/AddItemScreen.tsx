import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import { RootTabScreenProps } from "../navigation/types";
import { colors } from "../theme/colors";
import TextInput from "../components/TextInput";
import PhotoPicker from "../components/PhotoPicker";
import { fonts } from "../theme/fonts";

const schema = yup
  .object({
    photo: yup.string().required("Photo is required"),
    name: yup.string().required("Name is required"),
    value: yup
      .number()
      .typeError("Value must be a number")
      .positive()
      .integer()
      .required("Value is required"),
    description: yup.string(),
  })
  .required();

type FormValues = {
  photo: string;
  name: string;
  value: string;
  description?: string;
};

export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"AddItemScreen">) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (form: FormValues) => {
    console.log({ form });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button
          title="Add"
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <View style={styles.pickerWrapper}>
        <Controller
          control={control}
          name="photo"
          render={({ field: { onChange, value } }) => (
            <PhotoPicker
              photo={value}
              onChange={onChange}
              error={errors?.photo?.message}
            />
          )}
        />
      </View>

      <Controller
        control={control}
        name="name"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextInput
            error={error?.message}
            label="Name"
            margined
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Bracelet"
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="value"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextInput
            addon={<Text style={styles.inputCurrency}>€</Text>}
            error={error?.message}
            keyboardType="number-pad"
            label="Value"
            margined
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="700"
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextInput
            error={error?.message}
            label="Description"
            multiline
            numberOfLines={4}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Optional"
            textArea
            value={value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  } as ViewStyle,
  buttonsContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
  } as ViewStyle,
  pickerWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputCurrency: {
    color: colors.darkGrey,
    fontFamily: fonts.regular,
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 24,
  },
});
