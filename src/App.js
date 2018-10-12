import React, { Component } from "react";
import { Container } from "reactstrap";
import "./App.css";
import ParticlesJS from "./ParticleJS";

import StatsSection from "./stats_section/StatsSection";
import HeroesListing from "./heroesListing/HeroesListing";
import Header from "./Header";
import HomeNav from "./HomeNav";
import Footer from "./Footer";
import UsernameChoice from "./battle/UsernameChoice";
import BattleScreen from "./battle/BattleScreen";
import CombatInit from "./battle/CombatInit";


const listHeroes = [
  30,
  69,
  165,
  176,
  207,
  213,
  222,
  226,
  263,
  310,
  313,
  322,
  341,
  346,
  354,
  361,
  386,
  485,
  514,
  620,
  644
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      collapse: false,
      isCollapse: 0,
      heroes: [],
      battle: {
        player_1: {
          nickname: "",
          nicknameCheck: false
        },
        player_2: {
          nickname: "",
          nicknameCheck: false
        },
        round: {
          roundNumber: 1,
          roundStats: "",
          currentPlayer: "Mathieu"
        }
      },
      selectedHeroOfList: [],
      searchInputHeroList: ""

    };

    this.toggle = this.toggle.bind(this);
    this.handleSearchListChange = this.handleSearchListChange.bind(this);
    this.handleChangeNickname = this.handleChangeNickname.bind(this);
    this.finishRoom = this.finishRoom.bind(this);
  }

  handleChangeNickname = (event, name) => {
    let updateBattle = this.state.battle;
    if (name === "Player_1") {
      updateBattle.player_1.nickname = event.target.value;
    } else if (name === "Player_2") {
      updateBattle.player_2.nickname = event.target.value;
    }
    this.setState({
      battle: updateBattle
    });
  };

  submitCheck = name => {
    let updateBattle = this.state.battle;
    if (name === "Player_1") {
      updateBattle.player_1.nicknameCheck = true;
    } else if (name === "Player_2") {
      updateBattle.player_2.nicknameCheck = true;
    }
    this.setState({
      battle: updateBattle
    });
  };

  callApiSuperHeroes() {
    for (let i = 0; i < listHeroes.length; i++) {
      fetch(`http://superheroapi.com/api.php/2368931693133321/${listHeroes[i]}`)
        .then(results => results.json()) // conversion du résultat en JSON
        .then(data => {
          this.setState({
            heroes: [...this.state.heroes, data]
          });
        });
    }
  }

  finishRoom(currentPlayer) {
    let updateBattle = this.state.battle;

    if (currentPlayer === this.state.battle.player_1.nickname) {
      updateBattle.round.currentPlayer = this.state.battle.player_2.nickname;
    } else if (currentPlayer === this.state.battle.player_2.nickname) {
      updateBattle.round.currentPlayer = this.state.battle.player_1.nickname;
      updateBattle.round.roundNumber++;
    }

    this.setState({
      battle: updateBattle
    });
  }

  componentDidMount() {
    this.callApiSuperHeroes();
  }

  toggle(id) {
    this.setState({
      collapse: true,
      isCollapse: 1,
      selectedHeroOfList: id
    });
  }

  handleSearchListChange(event) {
    this.setState({ searchInputHeroList: event.target.value, collapse: false })
  }

  render() {
    return (
      <div>
        <ParticlesJS />
        <Header />
        <Container fluid>
          <HomeNav />
          <BattleScreen {...this.state.battle} finishRoom={this.finishRoom} />
          <UsernameChoice
            battle={this.state.battle}
            handleChangeNickname={this.handleChangeNickname}
            submitCheck={this.submitCheck}
          />

          <HeroesListing
            heroes={this.state.heroes}
            collapse={this.state.collapse}
            toggle={this.toggle}
            selectedHeroOfList={this.state.selectedHeroOfList}
            searchInputHeroList={this.state.searchInputHeroList}
            handleSearchListChange={this.handleSearchListChange}
            isCollapse={this.state.isCollapse}
          />
          <StatsSection />
          {/* <CombatInit /> */}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
