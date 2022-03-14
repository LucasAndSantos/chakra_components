import { Box, Button, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ArrowButtonInterface {
    name?: string;
    id: string;
    icon: any;
    setFunction: Function;
    setFunctionParameter?: any;
}

export default function ArrowButton({ name, id, icon, setFunction, setFunctionParameter, ...rest }: ArrowButtonInterface) {

    return (
        <Button
            {...rest}
            onClick={() => setFunction(setFunctionParameter)}
            h="50px"
            w="50px"
            bg="#152233"
            border="1px solid #333"
            color="#aaa"
            _hover={{ bg: "#304466" }}
            _focus={{ boxShadow: "none" }}
            _active={{ bg: "#304466" }}
        >
            <Icon as={icon} fontSize={30} />
        </Button>
    )
}