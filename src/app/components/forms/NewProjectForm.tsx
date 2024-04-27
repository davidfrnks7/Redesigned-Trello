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
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { createProject } from "@/app/lib/redux/features/projects/projectsSlice";

interface NewProjectFormProps {
  onClose: () => void;
}

const NewProjectForm = ({ onClose }: NewProjectFormProps): JSX.Element => {
  // Redux
  const dispatch = useAppDispatch();

  // Form field valid status.
  const [validProjectName, setValidProjectName] = useState<boolean>(false);

  // * Form Validation * //

  const validateProjectName = (
    inputProjectName: string | undefined
  ): string | undefined => {
    let projectNameError;

    if (!inputProjectName) {
      projectNameError = "A name is required.";
      setValidProjectName(false);
    } else if (/[\d]/gi.test(inputProjectName)) {
      projectNameError = "Only words and spaces are allowed in this field.";
      setValidProjectName(false);
    } else {
      setValidProjectName(true);
    }

    return projectNameError;
  };

  // Entire form valid
  const [validForm, setValidForm] = useState<boolean>(false);

  // Validate the fields when any of them change.
  useEffect(() => {
    if (!validProjectName) {
      setValidForm(false);
    }

    if (validProjectName) {
      setValidForm(true);
    }
  }, [validProjectName]);

  // * Handle Creating Project * //

  interface FormFields {
    projectName: string;
  }

  const handleSubmit = async ({
    projectName
  }: FormFields): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
      const returnData = dispatch(createProject(projectName));
      const actualTitle = returnData.payload;

      if (actualTitle === projectName) {
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
        projectName: ""
      }}
      onSubmit={(data, actions) => {
        handleSubmit(data)
          .then(status => {
            actions.setSubmitting(false);
            if (status) {
              actions.resetForm({
                values: {
                  projectName: ""
                }
              });
            }
          })
          .catch(() => {
            actions.setSubmitting(false);
          });
      }}
    >
      {props => (
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
            <Field name="projectName" validate={validateProjectName}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    form.errors.projectName && form.touched.projectName
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
                      <FormLabel
                        htmlFor="projectName"
                        w="30%"
                        m={0}
                        p={0}
                        mr={2}
                      >
                        {"Project Name"}
                      </FormLabel>
                      {!form.touched.projectName ? (
                        <EmojiValidate type="Required" />
                      ) : undefined}
                      {form.errors.projectName && form.touched.projectName ? (
                        <EmojiValidate type="Error" />
                      ) : undefined}
                      {!form.errors.projectName && form.touched.projectName ? (
                        <EmojiValidate type="Valid" />
                      ) : undefined}
                      <Input
                        ml={2}
                        required
                        {...fieldTheme}
                        type="text"
                        isDisabled={form.isSubmitting}
                        {...field}
                        id="projectName"
                        placeholder="My Awesome Project"
                        {...(!form.errors.projectName &&
                        form.touched.projectName
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
                          form.validateField("projectName");
                          form.setFieldTouched("projectName'");
                        }}
                      />
                    </HStack>
                    <FormErrorMessage>
                      {typeof form.errors.projectName === "string"
                        ? form.errors.projectName
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
              {"Create Project"}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default NewProjectForm;
