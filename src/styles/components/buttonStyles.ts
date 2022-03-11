import { whiten, darken } from "@chakra-ui/theme-tools"
export const ButtonStyles = {
    // Styles for the base style
    baseStyle: {},
    // Styles for the size variations
    sizes: {},
    // Styles for the visual style variations
    variants: {
        orange: {
            bg: "orange.default",
            color: "white",
            _hover: {
                bg: darken("orange.default", 10)
            },
        },
        blue: {
            bg: "blue.default",
            color: "white",
            _hover: {
                bg: darken("blue.default", 5)
            },
        },
        gray: {
            bg: "gray.400",
            color: "white",
            _hover: {
                bg: whiten("gray.400", 20)
            },
        },
        red: {
            bg: "red.800",
            color: "white",
            _hover: {
                bg: whiten("red.600", 0)
            },
        },
    },
    // The default `size` or `variant` values
    defaultProps: {
        variant: "orange"
    },
};
