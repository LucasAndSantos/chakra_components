import { useEffect, useState } from "react";
import { Box, Flex, Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import SelectSection from '../Components/Select'
import ArrowButton from "../Components/ArrowButton";

interface DatePickerInterface {
  
}

export default function DatePicker() {
  const [currentYear] = useState(new Date().getFullYear());
  const [currentMonth] = useState(new Date().getMonth());

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedMonthDay, setSelectedMonthDay] = useState(0);
  const [selectedWeekDay, setSelectedWeekDay] = useState(0);

  const [monthDays, setMonthDays] = useState([]);
  const totalMonthDays = 32 - new Date(selectedYear, selectedMonth, 32).getDate() // explicação da lógica no fim do arquivo 
  const weekDayOfTheFirstMonthDay = new Date(selectedYear, selectedMonth, 1).getDay();

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setemro", "Outubro", "Novembro", "Dezembro"]
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
  const shortMonths = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  const [sday, setSday] = useState();

  console.log(sday);
  

  useEffect(() => {
    setSelectedYear(new Date().getFullYear())
    setSelectedMonth(new Date().getMonth())
    setSelectedMonthDay(new Date().getDate())
    setSelectedWeekDay(new Date().getDay())
  }, [])

  useEffect(() => {
    SetMonthDaysInWeekDay()
  }, [selectedMonth])


  function SetMonthDaysInWeekDay() {
    let days = [];

    for (let wDay = 0; wDay < weekDayOfTheFirstMonthDay; wDay++) {
      days.push(null)
    }
    for (let day = 1; day <= totalMonthDays; day++) {
      days.push(day)
    }
    setMonthDays(days);
  }

  function SelectHandler(monthIndex) {
    setSelectedMonth(monthIndex);
  }

  function ArrowButtonHandler(x) {
    if (x === "Left") {
      if (selectedMonth <= 0) {
        setSelectedYear(selectedYear - 1);
        setSelectedMonth(11);
      } else {
        setSelectedMonth(selectedMonth - 1)
      }
    }

    if (x === "Right") {
      if (selectedMonth >= 11) {
        setSelectedYear(selectedYear + 1);
        setSelectedMonth(0);
      } else {
        setSelectedMonth(selectedMonth + 1)
      }
    }

  }

  // falta poder selecionar o ano e pegar a data no formato correto


  return (
    <Flex
      id="x"
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      fontFamily="sans-serif"
    >
      <Box border="1px solid gray" borderRadius="15px" bg="#ddd" >
        <Box p="0" pb="3" >
          <Box
            h="100px"
            w="100%"
            p="5"
            bg="#152233"
            borderRadius="15px 15px 0px 0px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <ArrowButton
              id="ArrowLeft"
              icon={MdKeyboardArrowLeft}
              setFunction={ArrowButtonHandler}
              setFunctionParameter="Left"
            />

            <SelectSection
              id="SelectMonth"
              data={months}
              maxWd="200px"
              setFunction={SelectHandler}
              setFunctionParameter={selectedMonth}
              setYear={selectedYear}
            />

            <ArrowButton
              id="ArrowLeft"
              icon={MdKeyboardArrowRight}
              setFunction={ArrowButtonHandler}
              setFunctionParameter="Right"
            />
          </Box>

          <Box p="3" mt="2" pb="0" bg="#ddd" color="#111" >
            <Table
              variant="unstyled"
            >
              <Thead cursor="default" >
                <Tr>
                  {
                    weekDays.map((x, i) => (
                      <Td
                        key={i}
                        p="1"
                        textAlign="center"
                      // color={i === currentWeekDay? "#304466" : ""}
                      >
                        <strong>{x}</strong>
                      </Td>
                    ))
                  }
                </Tr>
              </Thead>
              <Tbody>
                {
                  monthDays.map((x, i) => (
                    x === null ?
                      <Td
                        key={i}
                        px="4"
                      >
                      </Td>
                      :
                      i % 7 !== 0 ?
                        <Td
                          key={i}
                          _hover={{
                            bgColor: "#304466",
                            borderRadius: "7px",
                            color: "#ddd",
                          }}
                          textAlign="center"
                          px="4"
                          bg={currentYear === selectedYear && currentMonth === selectedMonth && selectedMonthDay === x ? "#152233" : ""}
                          color={selectedMonthDay === x ? "#ddd" : ""}
                          borderRadius={selectedMonthDay === x ? "7px" : ""}
                        >
                          {x}
                        </Td>
                        :
                        <>
                          <Tr></Tr>
                          <Td
                            key={i}
                            _hover={{
                              bgColor: "#304466",
                              borderRadius: "7px",
                              color: "#ddd",
                            }}
                            textAlign="center"
                            px="4"
                            bg={currentYear === selectedYear && currentMonth === selectedMonth && selectedMonthDay === x ? "#152233" : ""}
                            color={selectedMonthDay === x ? "#ddd" : ""}
                            borderRadius={selectedMonthDay === x ? "7px" : ""}
                            onClick={() => setSday(x)}
                          >
                            {x}
                          </Td>
                        </>
                  ))
                }
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Flex>

  )
}
/*      
    explicação:
    na função new Date() passamos na seguinte ordem (ano, mes, dia).getDate().
    
    * sendo assim a expressão (2022, 1, 20) siginifica basicamente 20 de fevereiro de 2022 
      - os meses estão em um array ["janeiro", "fevereiro", "março", ...]
    
    * o terceiro parametro que a função recebe (dia) é o dia do mês q queremos passar
      - passando (2022, 1 , 20) retorna basicamente as informações do dia, como o dia da semana, o mes ...: 
        Sun Feb 20 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)
        Dom Feb 20 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília) -- pt-br

      - passando (2022, 1 , 20).getDate() retorna basicamente o valor do dia que foi passado: 
        new Date(2022, 1 , 20).getDate() = 20 -> retorna 20 pq esse dia existe dentro do mes de fevereiro.

    * sabendo disso, chegamos a seguinte logica:
        1 - os meses possuem no max 31 dias.
        2 - ao passar o 32° (trigésimo segundo) dia do mês de fevereiro o retorno é a diferença entre esse dia e o total de dias no mes (28 no caso) 
              32 - 28 = 4, pq o 32° dia do mês de fevereiro é basicamente o dia 4 de março, ou seja
              (2022, 1, 32).getDate() = 4 de março
              (2022, 0, 32).getDate() = 1 de fevereiro

        ** obs.: ao passar a quantidade correta de dias de um mês, o retorno não é a diferença, é próprio dia:
          (2022, 0, 31).getDate() = 31 -> pq no ano de 2022, o mes[0] = janeiro tem 31 dias


    * para conseguir armazenar a quantidade de dias de um mês em uma variável, precisamos então da seguinte lógica:
      - passar o ano atual => new Date().getFullYear()
      - passar o mes atual => new Date().getMonth()
      - passar o valor de dias maior que a quantidade de dias max de um mes para que dê uma diferença, no caso, 32
      
    * a logica fica assim:

      let totalDeDiasNoMesAtual = 32 - new Date(anoAtual, mesAtual, 32). getDate();

        32 - new Date(2022, 0, 32). getDate();
        32 - 1 
        = 31 dias no mes de janeiro

        32 - new Date(2022, 1, 32). getDate();
        32 - 4 
        = 28 dias no mes de fevereiro

        32 - new Date(2022, 2, 32). getDate();
        32 - 1 
        = 31 dias no mes de março
        
        32 - new Date(2022, 3, 32). getDate();
        32 - 2 
        = 30 dias no mes de abril
      
    dessa maneira conseguimos o valor correto da quantidade de dias dentro de um mes, mesmo em ano bissexto
  */