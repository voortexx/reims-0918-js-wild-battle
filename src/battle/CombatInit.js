import React, { Component, Fragment } from "react";
import { Row, Col, Container } from "reactstrap";
import HeroCard from "../HeroCard";
import { Transition } from "react-spring";

import BattleContext from "../battle_context/BattleContext";

class CombatInit extends Component {
  render() {
    return (
      <Container fluid id="CombatInit" style={{ height: "100vh" }}>
        <BattleContext.Consumer>
          {context => (
            <Fragment>
              <div className="mt-5">
                <h2>
                  {
                    context.state.battle.stats[
                      context.state.battle.round.randomStat
                    ]
                  }
                </h2>
              </div>
              {context.state.battle[context.state.battle.round.currentPlayer]
                .deck.length > 0 && (
                <Row
                  className="mt-5 pt-5 justify-content-center"
                  style={{ minHeight: "80%" }}
                >
                  <Transition
                    keys={context.state.battle[
                      context.state.battle.round.currentPlayer
                    ].deck.map(item => item.id)}
                    from={{ opacity: 0, transform: "translate3d(-100px,0,0)" }}
                    enter={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                    leave={{
                      opacity: 0,
                      transform: "translate3d(-100px,0,0)"
                    }}
                    delay={300}
                  >
                    {context.state.battle[
                      context.state.battle.round.currentPlayer
                    ].deck.map(hero => styles => (
                      <Col
                        className="mt-5"
                        style={styles}
                        xs="2"
                        onClick={() => {
                          context.selectHero(hero.id);
                        }}
                        key={hero.id}
                      >
                        <HeroCard selectedHeroOfList={hero} />
                      </Col>
                    ))}
                  </Transition>
                </Row>
              )}
            </Fragment>
          )}
        </BattleContext.Consumer>
      </Container>
    );
  }
}

export default CombatInit;
