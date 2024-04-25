"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";
import { Field, Form, Formik, FieldProps } from "formik";
import { useAppSelector, useAppDispatch } from "@/app/lib/redux/hooks";
import { createProject } from "@/app/lib/redux/projects/projectsSlice";
import EmojiValidate from "../forms/EmojiValidate";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewProjectModal = ({
  isOpen,
  onClose
}: NewProjectModalProps): JSX.Element => {
  // Redux
  const project: Project = useAppSelector((state) => state.project);
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

  const handleSubmit = ({ projectName }: FormFields): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      dispatch(createProject(projectName));

      if (project.title === projectName) {
        resolve(true);
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
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{"Create Your Project"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <Formik
            initialValues={{
              projectName: ""
            }}
            onSubmit={(data, actions) => {
              handleSubmit(data)
                .then((status) => {
                  actions.setSubmitting(false);
                  if (status) {
                    actions.resetForm({
                      values: {
                        projectName: ""
                      }
                    });
                  }

                  onClose();
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
                          {!form.touched.projectName && (
                            <EmojiValidate type="Required" />
                          )}
                          {form.errors.projectName &&
                            form.touched.projectName && (
                              <EmojiValidate type="Error" />
                            )}
                          {!form.errors.projectName &&
                            form.touched.projectName && (
                              <EmojiValidate type="Valid" />
                            )}
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
                <ModalFooter>
                  <HStack
                    w="100%"
                    h="auto"
                    justifyContent="space-between"
                    alignContent="center"
                  >
                    <Button
                      mr={3}
                      onClick={onClose}
                      variant="cancel"
                      type="button"
                    >
                      {"Cancel"}
                    </Button>
                    <Button
                      variant="submit"
                      isDisabled={!validForm}
                      background={validForm ? "brand.valid" : "brand.danger"}
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      {"Create Project"}
                    </Button>
                  </HStack>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewProjectModal;
