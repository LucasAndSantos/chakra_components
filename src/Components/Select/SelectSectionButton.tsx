import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SelectSectionButtonProps {
    currentName: string;
    value: string;
    icon?: ReactNode;
    onClick: ReactNode;
}

export default function SelectSectionButton({ currentName, value, icon, ...rest }: SelectSectionButtonProps) {

    return (
        <Box
            name={currentName}
            value={value}
            w="100%"
            px="3"
            py="2"
            _hover={{bg:"#152233"}}
            cursor="pointer"            
            {...rest}
            
        >
            <HStack >
                {!!icon && <Icon as={icon} fontSize="20" />}

                <Text  >
                    {currentName} 
                </Text>
            </HStack>
        </Box>
    )
}