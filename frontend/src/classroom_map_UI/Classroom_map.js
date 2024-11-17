import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Classroom_map_button from "./Classroom_map_button";
export default function Classroom_map(){
    const [currentImage, setCurrentImage] = useState(null);
    const  handleButtonClick =(floor) =>{
        const imageMap ={
            B1:require('./B1平面圖.jpg'),
            1:require('./1樓平面圖.jpg'),
            2:require('./2樓平面圖.jpg'),
            3:require('./3樓平面圖.jpg'),
            4:require('./4樓平面圖.jpg'),
        };
        setCurrentImage(imageMap[floor]);
    }
    return (
        <Box
            sx={{
                width:'90%',
                marginLeft:'5%',
                height:'95vh'
            }}
        >
            <Card sx={{ width: '100%', height: '100%' }}>
                <h1 style={{ marginLeft: '1.5%' ,marginTop:'1.5%' }}>選擇樓層:</h1>
                <Classroom_map_button text="B1" onClick={handleButtonClick} ></Classroom_map_button>
                <Classroom_map_button text=" 1" onClick={handleButtonClick}></Classroom_map_button>
                <Classroom_map_button text=" 2" onClick={handleButtonClick}></Classroom_map_button>
                <Classroom_map_button text=" 3" onClick={handleButtonClick}></Classroom_map_button>
                <Classroom_map_button text=" 4" onClick={handleButtonClick}></Classroom_map_button>
                {currentImage &&(
                    <Box sx={{textAlign:'center',marginTop:2}}>
                        <img src={currentImage} alt='classroom map' style={{width:'80%'}}/>
                    </Box>
                )}
            </Card>
        </Box>
    );
}