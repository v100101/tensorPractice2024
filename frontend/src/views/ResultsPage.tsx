import { Avatar, Box, Button, Container, List, Stack, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate} from "react-router-dom";
import { useMediaMatch } from '../hooks/useMobileMatch';
import { useSelector } from "react-redux";
import { getGameByCode, selectGame } from "../store/gameSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../store/storeHooks";
import Player from "../utils/types/Player";
import { WebSocketActionTypes } from "../store/webSocketMiddleware";
import QuitGamePopup from "../components/QuitGamePopup";


export default function ResultsPage(){
    const navigate = useNavigate();
    const {isMobile} = useMediaMatch();
    const dispatch = useAppDispatch();
    const {game} = useSelector(selectGame)

    useEffect(() => {
        dispatch(getGameByCode( game.code));
    }, [dispatch,  game.code]);

    useEffect(() => {
        if(game.id <= 0) {
            navigate('/');
        } else if(!game.is_started) {
            dispatch({type: WebSocketActionTypes.RESTART_GAME, payload: {gameCode: game.code, username: '', avatarId: 0}});
            navigate(`/lobby/${game.code}`);
        }
    }, [game.is_started, game.code, game.id, dispatch, navigate])


    const quitGame = () => {
        dispatch({type: WebSocketActionTypes.QUIT_GAME, payload: {gameCode: game.code, username: '', avatarId: 0}});
        navigate(`/`);
    }

    console.log(game)
    /*const onGameCreate = () => {
        navigate(`/`);
        //dispatch(signUp(true));
        //dispatch(postCreateGame());
        // if(game.id > 0) {
        //     navigate(`/lobby/${game.id}`);
        //     navigate(`/`);
        // }
    };*/
    let players = game.players
    console.log(players)
    let firstPlace
    let playersFiltered
    
    if(players.length !== 0 ){
        if(players.length > 1){
            playersFiltered = [...players].sort((a, b) => Number(a.score) - Number(b.score)).reverse();
            firstPlace = playersFiltered.splice(0,1)
            console.log(firstPlace)
            console.log(playersFiltered)
        }
        console.log(players)
    }
    console.log(firstPlace)
    return(
        // <Container maxWidth='lg' sx={{padding: '1.3vh', borderRadius: 5, display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
          <Container maxWidth='lg' sx={{display: 'flex', padding: '0vw', flexDirection: 'row',justifyContent:'center', alignItems: 'center', gap:'2px'}}>
            <Box sx={{display: 'flex', fontSize:'2vh',flexDirection: 'column', width:'70%',  alignItems: 'center'}}>
                <Typography sx={{fontSize:'48', fontWeight:'700', borderRadius:'142px', padding:'15', marginBottom:'0.9vh'}}>Результаты игры</Typography>
                {(players.length === 1)?
                    <Stack direction={isMobile ? 'column' : 'row'}  sx={{display:'flex', alignItems:'center', paddingY:'1vh', border:'6px solid #FDD59C', borderRadius:'41px', background:'#FDD59C', width:'100%'}}>
                        <Avatar alt='avatar 1' variant='circular' src={players[0].avatar}  sx={{ width: '15vh', height: '15vh'}} >
                            <PersonIcon sx={{color: 'black', width: '10vh', height: '10vh'}}/>
                        </Avatar>
                        <Box alignItems={isMobile ? 'center' : 'flex-start'} sx={{margin:'1.6vw', display:'flex', flexDirection:'column', gap:'3vh'}}>
                            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                                <Typography style={{fontWeight:'500', fontSize:'3vh', color:'#C94F48'}}>{players[0].name}</Typography>
                                <Box display={isMobile ? 'none' : 'flex'}><img width={'50px'} height={'50px'} src="/medal.png" /></Box>
                            </Box>
                            <Typography style={{fontWeight:'500', fontSize:'2vh', color:'#C94F48'}}>Итоговые баллы: {players[0].score}</Typography>
                        </Box>
                    </Stack>
                    :<>
                        {(firstPlace !== undefined && playersFiltered !== undefined)?
                        <Box width={'90%'}><Stack direction={isMobile ? 'column' : 'row'}  sx={{display:'flex', alignItems:'center', paddingY:'1vh', marginBottom:'0.9vh', border:'6px solid #FDD59C', borderRadius:'41px', background:'#FDD59C'}}>
                        <Avatar alt='avatar 1' variant='circular' src={firstPlace[0].avatar} sx={{ width: '15vh', height: '15vh'}} >
                            <PersonIcon sx={{color: 'black', width: '10vh', height: '10vh'}}/>
                        </Avatar>
                        <Box alignItems={isMobile ? 'center' : 'flex-start'} sx={{margin:'1.6vw', display:'flex', flexDirection:'column', gap:'3vh'}}>
                            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                                <Typography style={{fontWeight:'500', fontSize:'3vh', color:'#C94F48'}}>{firstPlace[0].name}</Typography>
                                <Box display={isMobile ? 'none' : 'flex'}><img width={'50px'} height={'50px'} src="/medal.png" /></Box>
                                </Box>
                            <Typography style={{fontWeight:'500', fontSize:'2vh', color:'#C94F48'}}>Итоговые баллы: {firstPlace[0].score}</Typography>
                        </Box>
                    </Stack>
                    <List style={{maxHeight: '30vh', width:'100%', overflowY: 'auto', overflowX:'hidden', display:'flex', flexDirection:"column",  flexWrap:"nowrap", justifyContent:'space-between', marginBottom:'1.6vw', rowGap:'1vh'  }}>
                    {(playersFiltered.map((player: Player, place: number)=>
                        <Box sx={{width:'99%', display: 'flex', justifyContent:'space-between', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center', paddingBottom:'1.1vw', paddingRight:'1vh'}}>
                        <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                            <Typography sx={{width:'11vh', paddingRight:'3vh'}}>{place+2} место</Typography>
                                <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                                    <Avatar alt='avatar 1' variant='circular' src={player.avatar} sx={{ width: '5vh', height: '5vh', marginRight:'1vh'}} >
                                        <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                                    </Avatar>
                                    <Typography>{player.name}</Typography>
                                </Box>
                        </Box>
                        <Typography>{player.score}</Typography>
                    </Box>
                    ))}
                    </List>
                        </Box>:<Typography>Игроки не найдены</Typography>}
                    </>
                    }
                    
                
                <Container maxWidth='md' sx={{position:'absolute', bottom:'1vh', left:'50%', marginRight:'-50%', transform:'translate(-50%, -50%)', alignItems:'center', margin:'0 auto', display: 'flex', flexDirection: 'row', justifyContent:'space-around', paddingBottom:'10px', gap: 1}}>
                    <Box display={isMobile ? 'none' : 'flex'}>
                        <Button
                            variant='contained'
                            color="secondary"
                            onClick={quitGame}>
                                Завершить игру
                        </Button>
                    </Box>
                    {/*<Button 
                        variant='contained'
                        onClick={onGameCreate}>
                            Играть снова
                    </Button>*/}
                </Container>
            </Box>
            <QuitGamePopup quitGame={quitGame}/>
           </Container>
    );
}
