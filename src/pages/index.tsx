import { useEffect, useState } from "react";
import { Box, Button, Flex, HStack, Icon, Input, Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'

import SelectSection from '../Components/Select'

export default function Home() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentMonthDay = new Date().getDate();
  const currentWeekDay = new Date().getDay();

  const totalMonthDays = 32 - new Date(currentYear, currentMonth, 32).getDate() // explicação da lógica no fim do arquivo 
  const firstWeekDay = new Date(currentYear, currentMonth, 1).getDay();

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setemro", "Outubro", "Novembro", "Dezembro"]
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
  const shortMonths = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);
  const [selectedDay, setSelectedDay] = useState(currentMonthDay);

  const [monthDays, setMonthDays] = useState([]);

  console.log(selectedMonth);


  useEffect(() => {
    GetDate()
  }, [])

  function GetDate() {
    let startmonthDays = [];

    for (let wDay = 0; wDay < firstWeekDay; wDay++) {
      startmonthDays.push(null)
    }
    for (let day = 1; day <= totalMonthDays; day++) {
      startmonthDays.push(day)
    }
    setMonthDays(startmonthDays);
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
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
            <Button
              p="0"
              h="50px"
              w="50px"
              bg="#333"
              border="2px solid #aaa"
            >
              <Icon as={MdKeyboardArrowLeft} fontSize={35} />
            </Button>

            <SelectSection
              name="selectDate"
              maxWd="200px"
              data={months}
              currentSelectedMonth={setSelectedMonth}
              initialMonthValue={selectedMonth}
              initialYearValue={selectedYear}
            />

            <Button
              p="0"
              h="50px"
              w="50px"
              bg="#333"
              border="2px solid #aaa"
            >
              <Icon as={MdKeyboardArrowRight} fontSize={35} />
            </Button>
          </Box>
          <Box p="3" mt="2" pb="0" bg="#ddd" color="#111" >
            <Table
              variant="unstyled"
            >
              <Thead cursor="default" >
                <Tr>
                  {
                    weekDays.map((x) => (
                      <Td
                        p="1"
                        textAlign="center"
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
                        px="4"
                      >
                      </Td>
                      :
                      i % 7 !== 0 ?
                        <Td
                          _hover={{
                            bgColor: "#152233",
                            borderRadius: "7px",
                            color: "#ddd",
                          }}
                          textAlign="center"
                          px="4"
                        >
                          {x}
                        </Td>
                        :
                        <>
                          <Tr></Tr>
                          <Td _hover={{
                            bgColor: "#152233",
                            borderRadius: "7px",
                            color: "#ddd",
                          }}
                            textAlign="center"
                            px="4"
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
    na função new Date() passamos na seguinte ordem (ano, mes[], dia).getDate().
    
    * sendo assim a expressão (2022, 1) siginifica basicamente fevereiro de 2022 
      - os meses são um array ["janeiro", "fevereiro", "março", ...]
    
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