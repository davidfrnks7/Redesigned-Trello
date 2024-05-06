import {
  FormControl,
  VStack,
  HStack,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import EmojiValidate from "./EmojiValidate";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { createTable } from "@/app/lib/redux/features/projects/projectsSlice";

interface NewTableFormProps {
  onClose: () => void;
}

const NewTableForm = ({ onClose }: NewTableFormProps): JSX.Element => {
  // Redux
  const dispatch = useAppDispatch();

  // Form field valid status.
  const [validTableName, setValidTableName] = useState<boolean>(false);

  // * Form Validation * //

  const validateTableName = (
    inputTableName: string | undefined
  ): string | undefined => {
    let tableNameError;

    if (!inputTableName) {
      tableNameError = "A name is required.";
      setValidTableName(false);
    } else if (/[^a-zA-Z\d\s:]/.test(inputTableName)) {
      tableNameError = "Only words, numbers, and spaces are allowed.";
      setValidTableName(false);
    } else {
      setValidTableName(true);
    }

    return tableNameError;
  };

  // Entire form valid
  const [validForm, setValidForm] = useState<boolean>(false);

  // Validate the fields when any of them change.
  useEffect(() => {
    if (!validTableName) {
      setValidForm(false);
    }

    if (validTableName) {
      setValidForm(true);
    }
  }, [validTableName]);

  // * Handle Creating Table * //

  interface FormFields {
    tableName: string;
  }

  const handleSubmit = async ({ tableName }: FormFields): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
      const returnedData = dispatch(createTable(tableName));
      const actualTitle = returnedData.payload;

      if (actualTitle === tableName) {
        onClose();

        return resolve(true);
      }

      return reject(false);
    });
  };

  // Field theme
  const fieldTheme = {
    bg: "gray.900",
    borderColor: "white",
    _placeholder: {
      color: "gray.400",
      fontWeight: "light"
    },
    _focus: {
      bg: "#000",
      color: "#FFF",
      borderColor: "#63b3ed",
      boxShadow: "0 0 0 1px #63b3ed",
      zIndex: "1"
    }
  };

  return (
    <Formik
      initialValues={{
        tableName: ""
      }}
      onSubmit={(data, actions) => {
        handleSubmit(data)
          .then(status => {
            actions.setSubmitting(false);
            if (status) {
              actions.resetForm({
                values: {
                  tableName: ""
                }
              });
            }
          })
          .catch(() => {
            actions.setSubmitting(false);
          });
      }}
    >
      {({
        handleSubmit,
        errors,
        touched,
        isSubmitting,
        validateField,
        setFieldTouched
      }) => (
        <Form
          style={{
            width: "100%",
            height: "100%"
          }}
          onSubmit={handleSubmit}
        >
          <VStack
            spacing={6}
            justifyContent="center"
            alignItems="center"
            w="100%"
            h="auto"
          >
            <FormControl isInvalid={!!errors.tableName && touched.tableName}>
              <VStack
                h="auto"
                w="100%"
                spacing={0}
                alignItems="center"
                justifyContent="center"
              >
                <HStack
                  h="auto"
                  w="100%"
                  spacing={0}
                  alignItems="center"
                  justifyContent="center"
                >
                  <FormLabel htmlFor="tableName" w="30%" m={0} p={0} mr={2}>
                    {"Table Name"}
                  </FormLabel>
                  {!touched.tableName ? (
                    <EmojiValidate type="Required" />
                  ) : undefined}
                  {errors.tableName && touched.tableName ? (
                    <EmojiValidate type="Error" />
                  ) : undefined}
                  {!errors.tableName && touched.tableName ? (
                    <EmojiValidate type="Valid" />
                  ) : undefined}
                  <Field
                    as={Input}
                    id="tableName"
                    type="text"
                    name="tableName"
                    placeholder="Completed Tasks"
                    ml={2}
                    required
                    {...fieldTheme}
                    isDisabled={isSubmitting}
                    {...(!errors.tableName && touched.tableName
                      ? {
                          borderColor: "brand.valid",
                          boxShadow: "0 0 0 1px #00c17c",
                          _hover: {
                            borderColor: "brand.valid",
                            boxShadow: "0 0 0 1px #00c17c"
                          }
                        }
                      : "")}
                    onMouseLeave={() => {
                      validateField("tableName");
                      setFieldTouched("tableName'");
                    }}
                    validate={validateTableName}
                  />
                </HStack>
                <FormErrorMessage>
                  {typeof errors.tableName === "string" ? errors.tableName : ""}
                </FormErrorMessage>
              </VStack>
            </FormControl>
            <Button
              variant="submit"
              isDisabled={!validForm}
              background={validForm ? "brand.valid" : "brand.danger"}
              isLoading={isSubmitting}
              type="submit"
            >
              {"Create Table"}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default NewTableForm;
