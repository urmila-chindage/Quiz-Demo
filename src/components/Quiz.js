import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api'
import useStateContext from '../hooks/useStateContext'
import { Card, CardContent, CardMedia, CardHeader, List, ListItemButton, Typography, Box, LinearProgress,Radio,Button } from '@mui/material'
import { getFormatedTime } from '../helper'
import { useNavigate } from 'react-router';
import axios from "axios";

export default function Quiz(props) {

    const [qns, setQns] = useState([])
    const [qnIndex, setQnIndex] = useState(0)
    const [timeTaken, setTimeTaken] = useState(0)
    const { context, setContext } = useStateContext()

    const [allCategory, setAllCategory] = useState([]);
    const navigate = useNavigate()

    const[category,setCategpry] = useState([]);

    const getAllCategory = async () => {
        createAPIEndpoint(ENDPOINTS.category)
          .fetch()
          .then((res) => {
            setAllCategory(res.data);
            
            console.log(res.data);
          });
      };
    

    useEffect(async() => {
        setContext({
            timeTaken: 0,
            selectedOptions: []
        })
        getAllCategory();
    },[])

    const Category = async(e) => {
        let categoryValue = e.currentTarget.value;
       // alert(e.currentTarget.value)
          //serDeptValue(categoryValue)
        
         await axios.post(`http://localhost:5041/api/Question?dep=${categoryValue}`)
         .then((res) => {
             console.log(res.data)
               setQns(res.data)
               navigate(`/quiz?dep=${categoryValue}`);
         })
         .catch((err) => console.log(err));
        };
    
    
        

    const updateAnswer = (qnId, optionIdx) => {
        const temp = [...context.selectedOptions]
        temp.push({
            qnId,
            selected: optionIdx
        })
        if (qnIndex < 4) {
            setContext({ selectedOptions: [...temp] })
            setQnIndex(qnIndex + 1)
        }
        else {
            setContext({ selectedOptions: [...temp], timeTaken })
            navigate("/result")
        }
    }

    const backToQuestion = () =>{
        if (qnIndex > 0) {
            setQnIndex(qnIndex - 1)
        }
    }
    
   return (

    <div>
     
     <Box>
        {allCategory.map((category, index) => {
          return (
            <Button color="secondary" value={category.departments} onClick={Category}>
              {category.departments}
            </Button>
          );
        })}
     


      {  qns.length != 0
            ? <Card
                sx={{
                    maxWidth: 640, mx: 'auto', mt: 5,
                    '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' }
                }}>
                    
                <CardHeader
                    title={'Question ' + (qnIndex + 1) + ' of 5'}
                    action={<Typography>{getFormatedTime(timeTaken)}</Typography>} />
                <Box>
                    <LinearProgress variant="determinate" value={(qnIndex + 1) * 100 / 5} />
                </Box>
                {qns[qnIndex].imageName != null
                    ? <CardMedia
                        component="img"
                        image={BASE_URL + 'images/' + qns[qnIndex].imageName}
                        sx={{ width: 'auto', m: '10px auto' }} />
                    : null}
                <CardContent>
                    <Typography variant="h6">
                        {qns[qnIndex].qnInWords}
                    </Typography>
                    <List>
                        {qns[qnIndex].options.map((item, idx) =>
                       
                            <ListItemButton disableRipple key={idx} onClick={() => updateAnswer(qns[qnIndex].qnId, idx)}>
                                <div>
                                    <b>{String.fromCharCode(65 + idx) + " . "}</b>{item}
                                </div>

                            </ListItemButton>
                           
                        )}

                    </List>
                    <Button
                
                variant="contained"
                size="large"
                onClick = {()=>backToQuestion()}
                sx={{ width: "90%" ,marginLeft: "auto"}}
              >
               Back
              </Button>

             
                </CardContent>
            </Card>
            : null
                        }
            </Box>
            </div>
    )
}
