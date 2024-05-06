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
    } else if (/[^a-zA-Z\d\s:]/.test(inputProjectName)) {
      projectNameError = "Only words, numbers, and spaces are allowed.";
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
            <FormControl
              isInvalid={!!errors.projectName && touched.projectName}
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
                  <FormLabel htmlFor="projectName" w="30%" m={0} p={0} mr={2}>
                    {"Project Name"}
                  </FormLabel>
                  {!touched.projectName ? (
                    <EmojiValidate type="Required" />
                  ) : undefined}
                  {errors.projectName && touched.projectName ? (
                    <EmojiValidate type="Error" />
                  ) : undefined}
                  {!errors.projectName && touched.projectName ? (
                    <EmojiValidate type="Valid" />
                  ) : undefined}
                  <Field
                    as={Input}
                    id="projectName"
                    type="text"
                    name="projectName"
                    placeholder="My Awesome Project"
                    ml={2}
                    required
                    {...fieldTheme}
                    isDisabled={isSubmitting}
                    {...(!errors.projectName && touched.projectName
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
                      validateField("projectName");
                      setFieldTouched("projectName'");
                    }}
                    validate={validateProjectName}
                  />
                </HStack>
                <FormErrorMessage>
                  {typeof errors.projectName === "string"
                    ? errors.projectName
                    : ""}
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
              {"Create Project"}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default NewProjectForm;
