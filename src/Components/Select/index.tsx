import { ReactNode, useState } from 'react'
import { Box, Button, FormControl, FormLabel, Icon, Menu, MenuButton, MenuItem, MenuList, MenuOptionGroup, Text, } from '@chakra-ui/react'
import { RiArrowDownSLine } from 'react-icons/ri'

import SelectSectionButton from './SelectSectionButton'
import internal from 'stream';


interface SelectSectionProps {
    id: string;
    data: any;
    setFunction: Function;
    setFunctionParameter: number;
    setYear: number;
    name?: string;
    maxWd?: string;
}


export default function SelectSection({ name, id, data, setFunction, setFunctionParameter, setYear, maxWd, ...rest }: SelectSectionProps) {

    return (
        <FormControl {...rest} >
            <Menu autoSelect={false} >
                <MenuButton
                    as={Button}
                    variant="filled"
                    bgColor="#152233"
                    border="1px solid #333"
                    cursor="pointer"
                    fontWeight="normal"
                    size="lg"
                    w="100%"
                    maxW={maxWd ? maxWd : "100%"}
                    display="block"
                    margin="0 auto"
                    _hover={{ bg: "#304466" }}
                    _focus={{ boxShadow: "none", }}
                >
                    <Box display="flex" justifyContent="center">
                        {setFunctionParameter != null && <Text>{data[setFunctionParameter]} {setYear}</Text>}
                        <Icon as={RiArrowDownSLine} fontSize={20} ml="2" />
                    </Box>
                </MenuButton>

                <MenuList p="0" maxW="70px">

                    <MenuOptionGroup >
                        {
                            data?.map((x, i) => (
                                <MenuItem
                                    p="0"
                                    key={x.name}
                                >
                                    <SelectSectionButton
                                        currentName={x}
                                        value={i}
                                        icon={x.icon}
                                        onClick={() => setFunction(i)}
                                    />
                                </MenuItem>
                            ))
                        }
                    </MenuOptionGroup>
                </MenuList>
            </Menu>
        </FormControl>

    )
}