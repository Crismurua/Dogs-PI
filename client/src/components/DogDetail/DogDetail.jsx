import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getDetail } from "../../Redux/action";
import {BsFillArrowLeftCircleFill, BsFillTrashFill} from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { Button, styled } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#888',
  marginTop: 100
}));

const useStyles = makeStyles((theme) => ({
    img: {
      maxWidth: 800,
    },
    title: {
        fontSize: 70,
        justifySelf: 'center',
        marginLeft: 200
    },
    back: {
        maxHeight:60,
        marginTop: 135,
        fontSize: 60,
        color: '#888'
    },
    btn: {
        marginTop:10,
        fontSize: 60,
        color: '#888'
    }
    
  }));


const DogDetail = (props) => {
    const params = useParams(props);
    const dispatch = useDispatch();
    const detail = useSelector(state => state.dogDetail);
    const navigate = useHistory();
    const [alert, setAlert] = React.useState(false);

    React.useEffect(() => {
        dispatch(getDetail(params.id))
    }, [params.id, dispatch]);

    const handleDelete = () => {
        setAlert(true)
        
    }

    const handleEdit = () => {
        navigate.push(`/edit/${detail.id}`)
    }

    const classes = useStyles(); 

    return (
        <div className="main-detail" key={detail.id}>
            
            {detail || params.id !== detail.id ?
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                <Button className={classes.back} onClick={() => navigate.push('/dogs')}><BsFillArrowLeftCircleFill /></Button>
                
                <Grid item xs={8} key={detail.id}>
                    <Item className={classes.title}>{detail.name}</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>{detail.breed_group || 'None'}</Item>
                    <Item>height: {detail.height}cm</Item>
                    <Item>weight: {detail.weight}kg</Item>
                    <Item>life span: {detail.life_span} years</Item>
                    <Item>origin: {detail.origin || 'Unknown'}</Item>
                </Grid>
                <Grid item xs={8}>
                    <img className={classes.img} src={detail.img ? detail.img : '/media/fila-brasilero.jpg'} alt={detail.name} />
                    <br></br>
                    <Button className={classes.btn} onClick={handleDelete} disabled={detail.id?.length > 3 ? false : true}><BsFillTrashFill /></Button>
                    <Button className={classes.btn} onClick={handleEdit} disabled={detail.id?.length > 3 ? false : true}><AiFillEdit /></Button>
                    {alert ? 
                        <Grid sx={{ width: '100%' }}>
                            <Alert
                            variant="filled"
                            severity="warning"
                                onClick={() => {
                                    setAlert(false);
                                }}
                              action={
                                <Button color="inherit" size="small" onClick={()=> {
                                    fetch(`https://dogs-pi-production-c755.up.railway.app/dogs/${detail.id}`, {
                                        method: 'DELETE',
                                    }).then(r => {
                                        setAlert(false);
                                        navigate.push('/dogs');
                                    }
                                    )
                                }}>
                                  CONFIRM
                                </Button>
                                }
                            >
                            Are you sure you want to delete this dog?
                          </Alert>
                        </Grid>
                    : null}
                </Grid>
                <Grid item xs={8}>
                    {detail.temperaments ? detail.temperaments?.map(t => <Item>{t.name}</Item>) 
                    : <Item>{detail.temperament}</Item>}
                    {}
                    

                </Grid>
        
       

            </Grid>
        </Box>
            : <CircularProgress />}
        </div>
    )

};

export default DogDetail;