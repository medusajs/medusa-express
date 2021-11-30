import React, { useContext, useEffect } from "react";
import { Box, Text, Button, Flex } from "@theme-ui/components";
import Field from "./field";
import SelectCountry from "./select-country";
import OrderContext from "../../../context/order-context";
import SelectShipping from "./select-shipping";
import FieldSplitter from "./field-splitter";

const Delivery = ({ formik, isValid, setIsValid, region, country }) => {
  const { delivery } = useContext(OrderContext);
  console.log(country)

  useEffect(() => {
    formik.setFieldValue("delivery.country_code", country);
  }, country);
  
  return (
    <Box as="form">
      <Text
        as="h3"
        sx={{
          mb: "1em",
          fontSize: "1.1em",
          fontWeight: 550,
        }}
      >
        Delivery
      </Text>
      {!isValid.delivery ? (
        <>
          <Field
            formik={formik}
            placeholder={"Address 1"}
            value={formik.values.delivery.address_1}
            name={"address_1"}
            set={"delivery"}
          />
          <FieldSplitter
            left={
              <Field
                formik={formik}
                placeholder={"City"}
                value={formik.values.delivery.city}
                name={"city"}
                set={"delivery"}
              />
            }
            right={
              <Field
                formik={formik}
                placeholder={"Postal Code"}
                value={formik.values.delivery.postal_code}
                name={"postal_code"}
                set={"delivery"}
              />
            }
          />
          {/* <SelectCountry
            formik={formik}
            placeholder={"Country"}
            value={formik.values.delivery.country_code}
            name={"country_code"}
            set={"delivery"}
          /> */}
          <Text
            mt={4}
            as="h3"
            sx={{
              mb: "1em",
              fontSize: "1.1em",
              fontWeight: 550,
            }}
          >
            Shipping options
          </Text>
          <SelectShipping
            formik={formik}
            placeholder={"Select shipping method"}
            value={formik.values.delivery.shipping_option}
            name={"shipping_option"}
            set={"delivery"}
            region={region}
          />
        </>
      ) : (
        <Flex
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Flex
            sx={{
              flexDirection: "column",
              fontSize: ".8em",
            }}
          >
            <Text variant="summary">{delivery.address_1}</Text>
            <Text variant="summary">{`${delivery.postal_code}, ${delivery.city}`}</Text>
            <Text variant="summary">{delivery.country_code.toUpperCase()}</Text>
          </Flex>
          <Button
            sx={{
              bg: "transparent",
              color: "primary",
              textDecoration: "underline",
              cursor: "pointer",
              padding: "0",
            }}
            onClick={(e) => {
              e.preventDefault();
              setIsValid({ ...isValid, delivery: false });
            }}
          >
            Edit
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Delivery;
