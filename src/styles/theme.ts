import { extendTheme } from '@chakra-ui/react'
import { ButtonStyles as Button } from './components/buttonStyles'
const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

export const theme = extendTheme({
    config,
    components: {
        Button,
    },
    colors: {
        gray: {
            "900": "#181B23",
            "800": "#1F2029",
            "700": "#353646",
            "600": "#4B4D63",
            "500": "#616480",
            "400": "#797D9A",
            "300": "#9699B0",
            "200": "#B3B5C6",
            "100": "#D1D2DC",
            "50": "#EEEEF2",
        },
        offwhite: {
            "900": "#B1ACAA",
            "800": "#CAC7C7",
            "700": "#DBD9D9",
            "600": "#EFEFEF",
            "default": "#F3F2F3",
        },
        orange: {
            "900": "#B2371A",
            "800": "#D83C18",
            "700": "#E8461F",
            "default": "#f04f23",
            "500": "#EC6536",
        },
        blue: {
            "900": "#011F3E",
            "default": "#003366",
            "800": "#20315F",
            "700": "#31407A",
            "600": "#435E99",
            "500": "#5E80B8",
        },
        green: {
            "700": "#2F9E44",
            "600": "#51CF66",
        },
        red: {
            "800": "#842525",
            "700": "#D85151",
            "600": "#C92A2A",
            "500": "#FA5252",
        },
        yellow: {
            "800": "#E67700",
            "700": "#EDB412",
        }

    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto'
    },

    styles: {
        global: {

            '&::-webkit-scrollbar': { width: '10px', height: '0px' },
            '&::-webkit-scrollbar-track': { width: '10px', height: '10px' },
            '&::-webkit-scrollbar-thumb': { background: "gray.600", borderRadius: '24px' },
            '&::-webkit-scrollbar-thumb: hover': { background: "gray.400" },

            body: {
                bg: 'gray.900',
                color: 'gray.50',
            }

        }
    }
})