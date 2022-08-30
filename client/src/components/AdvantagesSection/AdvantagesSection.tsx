import {Grid, Typography} from "@mui/material";
import {productStyles} from "../../themes";
import {IconContext} from "react-icons";
import {RiPlantLine} from "react-icons/ri";
import {FiTruck} from "react-icons/fi";
import "./AdvantagesSection.css"
import {BsCoin} from "react-icons/bs";


export const AdvantagesSection = () => {
    return (
        <div className="advantages">
            <div className="advantages-header">
                <Typography
                    sx={{...productStyles.customBoldFont, ...productStyles.headerTypographyStyle}}>
                    Why buy flowers with FlowersBel?
                </Typography>
            </div>
            <Grid container spacing={4} justifyContent='center'>
                <Grid item xs={12} sm={12} md={4} >
                    <div className="advantages-container">
                        <IconContext.Provider value={{ color: 'black', size: '63'}}>
                            <RiPlantLine />
                        </IconContext.Provider>
                        <Typography
                            sx={{...productStyles.customBoldFont}}>
                            Quality assurance
                        </Typography>
                        <Typography
                            sx={productStyles.customSmallFont}>
                            We guarantee you the appearance and description of colors in the store and reality.
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} >
                    <div className="advantages-container">
                        <IconContext.Provider value={{ color: 'black', size: '63'}}>
                            <FiTruck />
                        </IconContext.Provider>
                        <Typography
                            sx={{...productStyles.customBoldFont}}>
                            Reliable suppliers
                        </Typography>
                        <Typography
                            sx={productStyles.customSmallFont}>
                            Direct supplies of plants and flowers from Europe - always a varied and unique assortment.
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <div className="advantages-container">
                        <IconContext.Provider value={{ color: 'black', size: '63'}}>
                            <BsCoin />
                        </IconContext.Provider>
                        <Typography
                            sx={{...productStyles.customBoldFont}}>
                            Low prices
                        </Typography>
                        <Typography
                            sx={productStyles.customSmallFont}>
                            We work directly with major suppliers and can offer prices lower than in most retail stores.
                        </Typography>
                    </div>
                </Grid>

            </Grid>
        </div>
    );
};