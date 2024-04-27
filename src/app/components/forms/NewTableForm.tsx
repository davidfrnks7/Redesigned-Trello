import {
  FormControl,
  VStack,
  HStack,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import React, { useEffect, useState } from "react";
import EmojiValidate from "./EmojiValidate";
import { useAppSelector, useAppDispatch } from "@/app/lib/redux/hooks";
import { createTable } from "@/app/lib/redux/features/projects/projectsSlice";

interface NewTableFormProps {
  onClose: () => void;
}

const NewTableForm = ({ onClose }: NewTableFormProps): JSX.Element => {
  // Redux
  const tables: TableSlice[] = useAppSelector((state) => state.project.tables);
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
    } else if (/[\d]/gi.test(inputTableName)) {
      tableNameError = "Only words and spaces are allowed in this field.";
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
      dispatch(createTable(tableName));

      if (tables[tables.length - 1].title === tableName) {
        resolve(true);

        onClose();
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
          .then((status) => {
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
      {(props) => (
        <Form
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <VStack
            spacing={6}
            justifyContent="center"
            alignItems="center"
            w="100%"
            h="auto"
          >
            <Field name="tableName" validate={validateTableName}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    form.errors.tableName && form.touched.tableName
                      ? true
                      : false
                  }
                >
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
                      {!form.touched.tableName && (
                        <EmojiValidate type="Required" />
                      )}
                      {form.errors.tableName && form.touched.tableName && (
                        <EmojiValidate type="Error" />
                      )}
                      {!form.errors.tableName && form.touched.tableName && (
                        <EmojiValidate type="Valid" />
                      )}
                      <Input
                        ml={2}
                        required
                        {...fieldTheme}
                        type="text"
                        isDisabled={form.isSubmitting}
                        {...field}
                        id="tableName"
                        placeholder="Completed Tasks"
                        {...(!form.errors.tableName && form.touched.tableName
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
                          form.validateField("tableName");
                          form.setFieldTouched("tableName'");
                        }}
                      />
                    </HStack>
                    <FormErrorMessage>
                      {typeof form.errors.tableName === "string"
                        ? form.errors.tableName
                        : ""}
                    </FormErrorMessage>
                  </VStack>
                </FormControl>
              )}
            </Field>
            <Button
              variant="submit"
              isDisabled={!validForm}
              background={validForm ? "brand.valid" : "brand.danger"}
              isLoading={props.isSubmitting}
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
