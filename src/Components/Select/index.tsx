import { ReactNode, useState } from 'react'
import { Box, Button, FormControl, FormLabel, Icon, Menu, MenuButton, MenuItem, MenuList, MenuOptionGroup, Text, } from '@chakra-ui/react'
import { RiArrowDownSLine } from 'react-icons/ri'

import SelectSectionButton from './SelectSectionButton'

interface SelectSectionProps {
    name: string;
    label?: string;
    data: any;
    setData: ReactNode;
    maxWd?: string;
    initialMonthValue?: string
    initialYearValue: number;
    currentSelectedMonth: Function;
}

export default function SelectSection({ name, label, data, setData, maxWd, initialMonthValue, initialYearValue, currentSelectedMonth, ...rest }: SelectSectionProps) {

    const [selectedMonth, setSelectedMonth] = useState(initialMonthValue);
    const [selectedYear, setSelectedYear] = useState(initialYearValue);

    function SetChangeMonth(index) {
        currentSelectedMonth(index);
    }


    return (
        <FormControl {...rest} >
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Menu autoSelect={false} >
                <MenuButton
                    name={name}
                    id={name}
                    as={Button}
                    variant="filled"
                    bgColor="#152233"
                    cursor="pointer"
                    size="lg"
                    w="100%"
                    fontWeight="normal"
                    maxW={maxWd ? maxWd : "100%"}
                    display="block"
                    margin="0 auto"
                >
                    <Box display="flex" justifyContent="center">
                        <Text>{selectedMonth} {initialYearValue}</Text>
                        <Icon as={RiArrowDownSLine} fontSize={20} ml="2" />
                    </Box>
                </MenuButton>

                <MenuList minWidth='240px' py="0" >

                    <MenuOptionGroup defaultValue="" >
                        {
                            data?.map((x, i) => (
                                <MenuItem
                                    p="0"
                                    key={x.name}
                                >
                                    <SelectSectionButton
                                        name={x}
                                        value={i}
                                        icon={x.icon}
                                        onClick={() => SetChangeMonth(i)}
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