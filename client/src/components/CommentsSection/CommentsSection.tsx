import React from 'react';
import {Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import "./CommentsSection.css"

const commentHeaderStyle = {
    margin: '50px 20px 200px',
    '&::before': {
        content: 'open-quote'
    },
    '&::after': {
        content: 'close-quote'
    }
}

const commentDescriptionStyle = {
    width: '100%',
    position: 'absolute',
    bottom: '100px',
    left: '50%',
    transform: 'translate(-50%, 0)',
}


const commentTypographyStyle = {
    fontFamily: 'MabryPro, sans-serif',
    color: '#3f0791',
    fontSize: '2rem',
}

const commentPhoto = {
    position: 'absolute',
    bottom: '-80px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    objectFit: "cover",
    borderRadius: "100%",
    height: "160px",
    width: "165px"
}

export const CommentsSection = () => {
    return (
        <div className='comments'>
            <Grid container spacing={2} rowSpacing={13}>
                <Grid item xs={12} md={4}>
                    <div data-aos="zoom-in-right" className='comment'>
                        <Typography
                            sx={{...commentTypographyStyle, ...commentHeaderStyle}}>
                            Thanks for your service. For us it is priceless!
                            Since I live very far from my mother, and every time she is touched to tears by your bouquets sent by her beloved daughter.
                            So the support service works perfectly quickly and sincerely. Thank you again!
                        </Typography>
                        <div data-aos='fade-up' className='comment-description'>
                            <Typography
                                sx={{...commentTypographyStyle, ...commentDescriptionStyle}}>
                                Kelly Leveaue
                            </Typography>
                            <Box
                                component="img"
                                sx={commentPhoto}
                                src={require("../../assets/images/human1.jpg")}
                            />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div data-aos="zoom-in-up" className='comment'>
                        <Typography
                            sx={{...commentTypographyStyle, ...commentHeaderStyle}}>
                            Спасибо большое за Ваши услуги. Это был мой первый опыт, я переживала. Букет оказался очень красивым, превзошел ожидания!
                            Теперь буду пользоваться Вашими услугами чаще и радовать своих родных на растоянии!
                            Фотоотчет поднял мое настроение с утра! Молодцы, ребята! Так держать!
                        </Typography>
                        <div data-aos="fade-up" className='comment-description'>
                            <Typography
                                sx={{...commentTypographyStyle, ...commentDescriptionStyle}}>
                                Vin Diesel
                            </Typography>
                            <Box
                                component="img"
                                sx={commentPhoto}
                                src={require("../../assets/images/human2.jpg")}
                            />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div data-aos="zoom-in-up" className='comment'>
                        <Typography
                            sx={{...commentTypographyStyle, ...commentHeaderStyle}}>
                            Ребята, спасибо большое!!! Все супер организовано.
                            Большой выбор стран, огромный выбор букетов, приемлемые цены, удобный интерфейс сайта,
                            вежливые операторы, смс и фото отчёт о доставке, возможность в день оформления заказа выбрать ещё и время доставки в тот же день.
                            И спасибо за промо код на следующий заказ!!!
                        </Typography>
                        <div data-aos="fade-up" className='comment-description'>
                            <Typography
                                sx={{...commentTypographyStyle, ...commentDescriptionStyle}}>
                                Arnold Schwarzenegger
                            </Typography>
                            <Box
                                component="img"
                                sx={commentPhoto}
                                src={require("../../assets/images/human3.jpg")}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

