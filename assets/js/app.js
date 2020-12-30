class Team {
    constructor() {
        this.teams = document.querySelector('.team_output');
        this.footer = document.querySelector('.rights');
        this.team = document.querySelector('.stats');
        const string_url = window.location.search;
        const urlParams = new URLSearchParams(string_url);
        this.url = urlParams.get('team');
        this.roster = document.querySelector('.current_roster');
        this.currentStatsBtn = document.querySelector('#current_stats');
        this.current_season_stats = document.querySelector('.current_season_stats');
        this.prevBtn = document.querySelector('#prev_season');
        this.previous_season_stats = document.querySelector('.previous_year');
        this.team_page_header = document.querySelector('.team_name');
    }
    
    loadTeams = function() {
        window.addEventListener('load', () => {
            fetch(`https://statsapi.web.nhl.com/api/v1/teams/`)
            .then(team => team.json())
            .then(res => {
                let teamsArray = res.teams;
                this.showTeams(teamsArray);
            })
            .catch(err => console.log(err));
        });
    }

    showTeams(teamsArray) {
        let output = ``;
        teamsArray.forEach((teams) => {
            output += `<li><a href="team.html?team=${teams.id}">${teams.name}</a></li>`;
        });
        this.teams.innerHTML = output;
    }

    getTheTeam() {
        window.addEventListener('load', () => {
            fetch(`https://statsapi.web.nhl.com/api/v1/teams/` + this.url + `?expand=teams.stats`)
            .then(teams => teams.json())
            .then(res => {
                res.teams.map(teams => {
                    let output = ``;
                    let title = `${teams.name}`;
                    output += `<h2>${teams.name}</h2>
                    <li><p><span>Team:</span> ${teams.abbreviation}</p></li>
                    <li><p><span>Conference:</span> ${teams.conference.name}</p></li>
                    <li><p><span>Division:</span> ${teams.division.name}</p></li>
                    <li><p><span>First Year:</span> ${teams.firstYearOfPlay}</p></li>
                    <li><p><span>Location:</span> ${teams.locationName}</p></li>
                    <li><p><span>Short:</span> ${teams.shortName}</p></li>
                    <li><p><span>Venue:</span> ${teams.venue.name}</p></li>
                    <li><p><span>Website:</span> <a href="${teams.officialSiteUrl}">${teams.officialSiteUrl}</p></a></li>`;
                    this.team.innerHTML = output;
                    this.team_page_header.innerHTML = title;
                })
            })
        })
    }

    currentSeasonStats() {
        this.currentStatsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('https://statsapi.web.nhl.com/api/v1/teams/'+this.url+'/stats')
            .then(response => response.json())
            .then(response => {
                response.stats.map(stats => {
                    let output = ``;
                    console.log(stats.splits[0].stat.gamesPlayed[0])
                    output += `<h2>Current Season Stats</h2>
                    <li><p>Games: ${stats.splits[0].stat.gamesPlayed}</p></li>
                    <li><p>Wins: ${stats.splits[0].stat.wins}</p></li>
                    <li><p>Losses: ${stats.splits[0].stat.losses}</p></li>
                    <li><p>Points: ${stats.splits[0].stat.pts}</p></li>
                    <li><p>Losses: ${stats.splits[0].stat.losses}</p></li>
                    <li><p>Goals per game: ${stats.splits[0].stat.goalsPerGame}</p></li>
                    <li><p>Goals against per game: ${stats.splits[0].stat.goalsAgainstPerGame}</p></li>
                    <li><p>Power play goals: ${stats.splits[0].stat.powerPlayGoals}</p></li>
                    <li><p>Power plays: ${stats.splits[0].stat.powerPlayOpportunities}</p></li>
                    <li><p>Power play %: ${stats.splits[0].stat.powerPlayPercentage}</p></li>
                    <li><p>Box play goals: ${stats.splits[0].stat.powerPlayGoalsAgainst}</p></li>
                    <li><p>Box play %: ${stats.splits[0].stat.penaltyKillPercentage}</p></li>
                    <li><p>Face Offs: ${stats.splits[0].stat.faceOffsTaken}</p></li>
                    <li><p>Face Offs Won: ${stats.splits[0].stat.faceOffsWon}</p></li>
                    <li><p>Face Offs Lost: ${stats.splits[0].stat.faceOffsLost}</p></li>
                    <li><p>Face Off Win %: ${stats.splits[0].stat.faceOffWinPercentage}</p></li>
                    <li><p>Shots per game: ${stats.splits[0].stat.shotsPerGame}</p></li>
                    <li><p>Shots Allowed: ${stats.splits[0].stat.shotsAllowed}</p></li>
                    <li><p>Shooting %: ${stats.splits[0].stat.shootingPctg}</p></li>
                    <li><p>Save %: ${stats.splits[0].stat.savePctg}</p></li>`;
                    this.current_season_stats.innerHTML = output;
                })
            })
        })
    }

    previousSeasonTeamStats() {
        
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('https://statsapi.web.nhl.com/api/v1/teams/'+this.url+'?expand=team.stats&season=20182019')
            .then(response => response.json())
            .then(response => {
                response.teams.map(teams => {
                    let output = ``;
                    output += `<h2>Last Season Stats</h2>
                    <li><p>Games: ${teams.teamStats[0].splits[0].stat.gamesPlayed}</p></li>
                    <li><p>Wins: ${teams.teamStats[0].splits[0].stat.wins}</p></li>
                    <li><p>Losses: ${teams.teamStats[0].splits[0].stat.losses}</p></li>
                    <li><p>Points: ${teams.teamStats[0].splits[0].stat.pts}</p></li>
                    <li><p>Losses: ${teams.teamStats[0].splits[0].stat.losses}</p></li>
                    <li><p>Goals per game: ${teams.teamStats[0].splits[0].stat.goalsPerGame}</p></li>
                    <li><p>Goals against per game: ${teams.teamStats[0].splits[0].stat.goalsAgainstPerGame}</p></li>
                    <li><p>Power play goals: ${teams.teamStats[0].splits[0].stat.powerPlayGoals}</p></li>
                    <li><p>Power plays: ${teams.teamStats[0].splits[0].stat.powerPlayOpportunities}</p></li>
                    <li><p>Power play %: ${teams.teamStats[0].splits[0].stat.powerPlayPercentage}</p></li>
                    <li><p>Box play goals: ${teams.teamStats[0].splits[0].stat.powerPlayGoalsAgainst}</p></li>
                    <li><p>Box play %: ${teams.teamStats[0].splits[0].stat.penaltyKillPercentage}</p></li>
                    <li><p>Face Offs: ${teams.teamStats[0].splits[0].stat.faceOffsTaken}</p></li>
                    <li><p>Face Offs Won: ${teams.teamStats[0].splits[0].stat.faceOffsWon}</p></li>
                    <li><p>Face Offs Lost: ${teams.teamStats[0].splits[0].stat.faceOffsLost}</p></li>
                    <li><p>Face Off Win %: ${teams.teamStats[0].splits[0].stat.faceOffWinPercentage}</p></li>
                    <li><p>Shots per game: ${teams.teamStats[0].splits[0].stat.shotsPerGame}</p></li>
                    <li><p>Shots Allowed: ${teams.teamStats[0].splits[0].stat.shotsAllowed}</p></li>
                    <li><p>Shooting %: ${teams.teamStats[0].splits[0].stat.shootingPctg}</p></li>
                    <li><p>Save %: ${teams.teamStats[0].splits[0].stat.savePctg}</p></li>`;
                    this.previous_season_stats.innerHTML = output;
                })
            })
        })
    }

    getRoster() {
        window.addEventListener('load', () => {
            fetch('https://statsapi.web.nhl.com/api/v1/teams/' + this.url + '/roster')
            .then(roster => roster.json())
            .then(res => {
                let rosterArray = res.roster;
                this.showRoster(rosterArray);
            })
            .catch(err => console.log(err));
        })
    }

    showRoster(rosterArray) {
        let output = ``;
        rosterArray.forEach((roster) => {
            output += `<li><a href="player.html?id=${roster.person.id}">${roster.person.fullName} | ${roster.jerseyNumber} | ${roster.position.code}</a></li>`;
        });
        this.roster.innerHTML = output;
    }
}

class RandomPlayer {
    loadRandomPlayer() {
        window.addEventListener('load', () => {
            fetch('https://statsapi.web.nhl.com/api/v1/people/8476458')
            .then(response => response.json())
            .then(response => {
                response.people.map(people => {
                    const player = document.querySelector('.player_info');
                    let output = ``;
                    output += `<h2>${people.fullName}</h2>
                <li><p><span>Birthdate:</span> ${people.birthDate}</p></li>
                <li><p><span>Age:</span> ${people.currentAge}</p></li>
                <li><p><span>City:</span> ${people.birthCity}</p></li>
                <li><p><span>Height:</span> ${people.height}</p></li>
                <li><p><span>Number:</span> ${people.primaryNumber}</p></li>
                <li><p><span>Position:</span> ${people.primaryPosition.name}</p></li>
                <li><p><span>Shoots:</span> ${people.shootsCatches}</p></li>
                <li><p><span>Team:</span> ${people.currentTeam.name}</p></li>`;
                    player.innerHTML = output;
                })
            })
        })
    }
}

class RandomPlayerStats {
    constructor() {
        this.current = document.getElementById('game_stats');
        this.stat = document.querySelector('.current_stats');
        this.lastStats = document.querySelector('.last_season');
        this.allCareerStats = document.querySelector('.all_career');
        this.playoff_stats = document.querySelector('.playoff_stats');
    }

    currentStats() {
        window.addEventListener('load', () => {
            fetch('https://statsapi.web.nhl.com//api/v1/people/8476458/stats?stats=statsSingleSeason&season=20192020')
            .then(response => response.json())
            .then(response => {
                response.stats.map(stats => {
                    console.log(stats);
                    let output = ``;
                    output += `<h2>Current Stats</h2>
                    <li><p><span>Assists:</span> ${stats.splits[0].stat.assists}</p></li>
                    <li><p><span>Goals:</span> ${stats.splits[0].stat.goals}</p></li>
                    <li><p><span>Total Points:</span> ${stats.splits[0].stat.points}</p></li>
                    <li><p><span>+-:</span> ${stats.splits[0].stat.plusMinus}</p></li>
                    <li><p><span>Games:</span> ${stats.splits[0].stat.games}</p></li>
                    <li><p><span>GWG:</span> ${stats.splits[0].stat.gameWinningGoals}</p></li>
                    <li><p><span>Overtime Goals:</span> ${stats.splits[0].stat.overTimeGoals}</p></li>
                    <li><p><span>Shots:</span> ${stats.splits[0].stat.shots}</p></li>
                    <li><p><span>Shot Pct:</span> ${stats.splits[0].stat.shotPct}</p></li>
                    <li><p><span>Power Play Goals:</span> ${stats.splits[0].stat.powerPlayGoals}</p></li>
                    <li><p><span>Power Play Points:</span> ${stats.splits[0].stat.powerPlayPoints}</p></li>
                    <li><p><span>Shorthanded Goals:</span> ${stats.splits[0].stat.shortHandedGoals}</p></li>
                    <li><p><span>Shorthanded Points:</span> ${stats.splits[0].stat.shortHandedPoints}</p></li>
                    <li><p><span>Time on Power Play:</span> ${stats.splits[0].stat.powerPlayTimeOnIce}</p></li>
                    <li><p><span>Time on Power Play / Game:</span> ${stats.splits[0].stat.powerPlayTimeOnIcePerGame}</p></li>
                    <li><p><span>Shorthanded Time On Ice:</span> ${stats.splits[0].stat.shortHandedTimeOnIce}</p></li>
                    <li><p><span>Shorthanded Time On Ice / Game:</span> ${stats.splits[0].stat.shortHandedTimeOnIcePerGame}</p></li>
                    <li><p><span>Time On Ice:</span> ${stats.splits[0].stat.timeOnIce}</p></li>
                    <li><p><span>Time On Ice / Game:</span> ${stats.splits[0].stat.timeOnIcePerGame}</p></li>
                    <li><p><span>Even Time On Ice:</span> ${stats.splits[0].stat.evenTimeOnIce}</p></li>
                    <li><p><span>Even Time On Ice / Game:</span> ${stats.splits[0].stat.evenTimeOnIcePerGame}</p></li>
                    <li><p><span>Face Off %:</span> ${stats.splits[0].stat.faceOffPct}</p></li>
                    <li><p><span>Hits:</span> ${stats.splits[0].stat.hits}</p></li>
                    <li><p><span>Blocked Shots:</span> ${stats.splits[0].stat.blocked}</p></li>`;
                    this.stat.innerHTML = output;
                })

            })
            .catch(err => console.log(err));
        })
    }

    lastSeasonStats() {
        window.addEventListener('load', () => {
            fetch('https://statsapi.web.nhl.com//api/v1/people/8476458/stats?stats=statsSingleSeason&season=20182019')
            .then(response => response.json())
            .then(response => {
                response.stats.map(stats => {
                    let output = ``;
                    output += `<h2>Last Season Stats</h2>
                    <li><p><span>Assists:</span> ${stats.splits[0].stat.assists}</p></li>
                    <li><p><span>Goals:</span> ${stats.splits[0].stat.goals}</p></li>
                    <li><p><span>Points:</span> ${stats.splits[0].stat.points}</p></li>
                    <li><p><span>+-:</span> ${stats.splits[0].stat.plusMinus}</p></li>
                    <li><p><span>Games:</span> ${stats.splits[0].stat.games}</p></li>
                    <li><p><span>GWG:</span> ${stats.splits[0].stat.gameWinningGoals}</p></li>
                    <li><p><span>Overtime Goals:</span> ${stats.splits[0].stat.overTimeGoals}</p></li>
                    <li><p><span>Shots:</span> ${stats.splits[0].stat.shots}</p></li>
                    <li><p><span>Shot %:</span> ${stats.splits[0].stat.shotPct}</p></li>
                    <li><p><span>Power Play Goals:</span> ${stats.splits[0].stat.powerPlayGoals}</p></li>
                    <li><p><span>Power Play Points:</span> ${stats.splits[0].stat.powerPlayPoints}</p></li>
                    <li><p><span>Shorthanded Goals:</span> ${stats.splits[0].stat.shortHandedGoals}</p></li>
                    <li><p><span>Shorthanded Points:</span> ${stats.splits[0].stat.shortHandedPoints}</p></li>
                    <li><p><span>Time on Power Play:</span> ${stats.splits[0].stat.powerPlayTimeOnIce}</p></li>
                    <li><p><span>Time on Power Play / Game:</span> ${stats.splits[0].stat.powerPlayTimeOnIcePerGame}</p></li>
                    <li><p><span>Shorthanded Time On Ice:</span> ${stats.splits[0].stat.shortHandedTimeOnIce}</p></li>
                    <li><p><span>Shorthanded Time On Ice / Game:</span> ${stats.splits[0].stat.shortHandedTimeOnIcePerGame}</p></li>
                    <li><p><span>Time On Ice:</span> ${stats.splits[0].stat.timeOnIce}</p></li>
                    <li><p><span>Time On Ice / Game:</span> ${stats.splits[0].stat.timeOnIcePerGame}</p></li>
                    <li><p><span>Even Time On Ice:</span> ${stats.splits[0].stat.evenTimeOnIce}</p></li>
                    <li><p><span>Even Time On Ice / Game:</span> ${stats.splits[0].stat.evenTimeOnIcePerGame}</p></li>
                    <li><p><span>Face Off %:</span> ${stats.splits[0].stat.faceOffPct}</p></li>
                    <li><p><span>Hits:</span> ${stats.splits[0].stat.hits}</p></li>
                    <li><p><span>Blocked Shots:</span> ${stats.splits[0].stat.blocked}</p></li>`;
                    this.lastStats.innerHTML = output;
                })
            })
            .catch(err => console.log(err));
        })
    }

    careerStats() {
        window.addEventListener('load', () => {
            fetch('https://statsapi.web.nhl.com/api/v1/people/8476458?expand=person.stats,stats.team&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason&site=en_nhl')
            .then(response => response.json())
            .then(response => {
                response.people.map(people => {
                    let output = ``;
                    output += `<h2>Career Stats</h2>
                    <li><p><span>Assists:</span> ${people.stats[2].splits[0].stat.assists}</p></li>
                    <li><p><span>Goals:</span> ${people.stats[2].splits[0].stat.goals}</p></li>
                    <li><p><span>Points:</span> ${people.stats[2].splits[0].stat.points}</p></li>
                    <li><p><span>+-:</span> ${people.stats[2].splits[0].stat.plusMinus}</p></li>
                    <li><p><span>Games:</span> ${people.stats[2].splits[0].stat.games}</p></li>
                    <li><p><span>GWG:</span> ${people.stats[2].splits[0].stat.gameWinningGoals}</p></li>
                    <li><p><span>Overtime Goals:</span> ${people.stats[2].splits[0].stat.overTimeGoals}</p></li>
                    <li><p><span>Shots:</span> ${people.stats[2].splits[0].stat.shots}</p></li>
                    <li><p><span>Shot %:</span> ${people.stats[2].splits[0].stat.shotPct}</p></li>
                    <li><p><span>Power Play Goals:</span> ${people.stats[2].splits[0].stat.powerPlayGoals}</p></li>
                    <li><p><span>Power Play Points:</span> ${people.stats[2].splits[0].stat.powerPlayPoints}</p></li>
                    <li><p><span>Shorthanded Goals:</span> ${people.stats[2].splits[0].stat.shortHandedGoals}</p></li>
                    <li><p><span>Shorthanded Points:</span> ${people.stats[2].splits[0].stat.shortHandedPoints}</p></li>
                    <li><p><span>Time on Power Play:</span> ${people.stats[2].splits[0].stat.powerPlayTimeOnIce}</p></li>
                    <li><p><span>Time on Power Play / Game:</span> ${people.stats[2].splits[0].stat.powerPlayTimeOnIcePerGame}</p></li>
                    <li><p><span>Shorthanded Time On Ice:</span> ${people.stats[2].splits[0].stat.shortHandedTimeOnIce}</p></li>
                    <li><p><span>Shorthanded Time On Ice / Game:</span> ${people.stats[2].splits[0].stat.shortHandedTimeOnIcePerGame}</p></li>
                    <li><p><span>Time On Ice:</span> ${people.stats[2].splits[0].stat.timeOnIce}</p></li>
                    <li><p><span>Time On Ice / Game:</span> ${people.stats[2].splits[0].stat.evenTimeOnIcePerGame}</p></li>
                    <li><p><span>Face Off %:</span> ${people.stats[2].splits[0].stat.faceOffPct}</p></li>
                    <li><p><span>Hits:</span> ${people.stats[2].splits[0].stat.hits}</p></li>
                    <li><p><span>Blocked Shots:</span> ${people.stats[2].splits[0].stat.blocked}</p></li>`;
                    this.allCareerStats.innerHTML = output;
                })
            })
        })
    }

    playoffStats() {
        window.addEventListener('load', () => {
            fetch('https://statsapi.web.nhl.com/api/v1/people/8476458?expand=person.stats,stats.team&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason,careerPlayoffs&site=en_nhl')
            .then(people => people.json())
            .then(res => {
                res.people.map(people => {
                    let output = ``;
                    output += `<h2>Playoff Stats</h2>
                <li><p><span>Goals:</span> ${people.stats[3].splits[0].stat.assists}</p></li>
                <li><p><span>+-:</span> ${people.stats[3].splits[0].stat.plusMinus}</p></li>
                <li><p><span>Games:</span> ${people.stats[3].splits[0].stat.games}</p></li>
                <li><p><span>GWG:</span> ${people.stats[3].splits[0].stat.gameWinningGoals}</p></li>
                <li><p><span>Overtime Goals:</span> ${people.stats[3].splits[0].stat.overTimeGoals}</p></li>
                <li><p><span>Shots:</span> ${people.stats[3].splits[0].stat.shots}</p></li>
                <li><p><span>Shot %:</span> ${people.stats[3].splits[0].stat.shotPct}</p></li>
                <li><p><span>Power Play Goals:</span> ${people.stats[3].splits[0].stat.powerPlayGoals}</p></li>
                <li><p><span>Power Play Points:</span> ${people.stats[3].splits[0].stat.powerPlayPoints}</p></li>
                <li><p><span>Shorthanded Goals:</span> ${people.stats[3].splits[0].stat.shortHandedGoals}</p></li>
                <li><p><span>Shorthanded Points:</span> ${people.stats[3].splits[0].stat.shortHandedPoints}</p></li>
                <li><p><span>Time on Power Play:</span> ${people.stats[3].splits[0].stat.powerPlayTimeOnIce}</p></li>
                <li><p><span>Time on Power Play / Game:</span> ${people.stats[3].splits[0].stat.powerPlayTimeOnIcePerGame}</p></li>
                <li><p><span>Shorthanded Time On Ice:</span> ${people.stats[3].splits[0].stat.shortHandedTimeOnIce}</p></li>
                <li><p><span>Shorthanded Time On Ice / Game:</span> ${people.stats[3].splits[0].stat.shortHandedTimeOnIcePerGame}</p></li>
                <li><p><span>Time On Ice:</span> ${people.stats[3].splits[0].stat.timeOnIce}</p></li>
                <li><p><span>Time On Ice / Game:</span> ${people.stats[3].splits[0].stat.evenTimeOnIcePerGame}</p></li>
                <li><p><span>Face Off %:</span> ${people.stats[3].splits[0].stat.faceOffPct}</p></li>
                <li><p><span>Hits:</span> ${people.stats[3].splits[0].stat.hits}</p></li>
                <li><p><span>Blocked Shots:</span> ${people.stats[3].splits[0].stat.blocked}</p></li>`;
                this.playoff_stats.innerHTML = output;
                })
            })
        })
    }
}

class Player {
    constructor() {
        this.intro = document.querySelector('.player_intro');
        this.current_stats = document.querySelector('.current_stats');
        this.last_stats = document.querySelector('.last_season');
        this.career_stats = document.querySelector('.all_career');
        this.playoff_stats = document.querySelector('.playoff_stats');
        this.currentBtn = document.querySelector('#current_stats');
        this.last_seasonBtn = document.querySelector('#last_season');
        this.careerBtn = document.querySelector('#career_stats');
        this.playoffBtn = document.querySelector('#playoff_stats');
        this.player_name = document.querySelector('.player_name');
        const string_url = window.location.search;
        const urlParams = new URLSearchParams(string_url);
        this.url = urlParams.get('id');
        this.json_fetch = `https://statsapi.web.nhl.com/api/v1/people/${this.url}?expand=person.stats,stats.team&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason,careerPlayoffs&site=en_nhl`;
        this.json_current_stats = `https://statsapi.web.nhl.com/api/v1/people/${this.url}/stats?stats=statsSingleSeason&season=20192020`;
        this.json_last_stats = `https://statsapi.web.nhl.com//api/v1/people/${this.url}/stats?stats=statsSingleSeason&season=20182019`
        console.log(this.json_fetch);
    }

    playerStats() {
        window.addEventListener('load', () => {
            fetch(this.json_fetch)
            .then(people => people.json())
            .then(res => {
                res.people.map(people => {
                    let output = ``;
                    output += `<h2>${people.fullName}</h2>
                    <li><p><span>Age:</span> ${people.currentAge}</p></li>
                    <li><p><span>City:</span> ${people.birthCity}</p></li>
                    <li><p><span>Country:</span> ${people.birthCountry}</p></li>
                    <li><p><span>Birth date:</span> ${people.birthDate}</p></li>
                    <li><p><span>Height:</span> ${people.height}</p></li>
                    <li><p><span>Number:</span> ${people.primaryNumber}</p></li>
                    <li><p><span>Position:</span> ${people.primaryPosition.name}</p></li>
                    <li><p><span>Shoots:</span> ${people.shootsCatches}</p></li>`;
                    this.intro.innerHTML = output;
                    this.player_name.innerText = `${people.fullName}`;
                })
            })
        })
    }

    playerCurrentStats() {
        this.currentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(this.json_current_stats)
            .then(people => people.json())
            .then(res => {
                res.stats.map(stats => {
                    let output = ``;
                    output += `<h2>Current Stats</h2>
                    <li><p><span>Goals:</span> ${stats.splits[0].stat.goals}</p></li>
                    <li><p><span>Assists:</span> ${stats.splits[0].stat.assists}</p></li>
                    <li><p><span>Points:</span> ${stats.splits[0].stat.points}</p></li>
                    <li><p><span>+-:</span> ${stats.splits[0].stat.plusMinus}</p></li>
                    <li><p><span>Games:</span> ${stats.splits[0].stat.games}</p></li>
                    <li><p><span>GWG:</span> ${stats.splits[0].stat.gameWinningGoals}</p></li>
                    <li><p><span>Overtime Goals:</span> ${stats.splits[0].stat.overTimeGoals}</p></li>
                    <li><p><span>Shots:</span> ${stats.splits[0].stat.shots}</p></li>
                    <li><p><span>Shot Pct:</span> ${stats.splits[0].stat.shotPct}</p></li>
                    <li><p><span>Power Play Goals:</span> ${stats.splits[0].stat.powerPlayGoals}</p></li>
                    <li><p><span>Power Play Points:</span> ${stats.splits[0].stat.powerPlayPoints}</p></li>
                    <li><p><span>Shorthanded Goals:</span> ${stats.splits[0].stat.shortHandedGoals}</p></li>
                    <li><p><span>Shorthanded Points:</span> ${stats.splits[0].stat.shortHandedPoints}</p></li>
                    <li><p><span>Time on Power Play:</span> ${stats.splits[0].stat.powerPlayTimeOnIce}</p></li>
                    <li><p><span>Time on Power Play / Game:</span> ${stats.splits[0].stat.powerPlayTimeOnIcePerGame}</p></li>
                    <li><p><span>Shorthanded Time On Ice:</span> ${stats.splits[0].stat.shortHandedTimeOnIce}</p></li>
                    <li><p><span>Shorthanded Time On Ice / Game:</span> ${stats.splits[0].stat.shortHandedTimeOnIcePerGame}</p></li>
                    <li><p><span>Time On Ice:</span> ${stats.splits[0].stat.timeOnIce}</p></li>
                    <li><p><span>Time On Ice / Game:</span> ${stats.splits[0].stat.timeOnIcePerGame}</p></li>
                    <li><p><span>Even Time On Ice:</span> ${stats.splits[0].stat.evenTimeOnIce}</p></li>
                    <li><p><span>Even Time On Ice / Game:</span> ${stats.splits[0].stat.evenTimeOnIcePerGame}</p></li>
                    <li><p><span>Face Off %:</span> ${stats.splits[0].stat.faceOffPct}</p></li>
                    <li><p><span>Hits:</span> ${stats.splits[0].stat.hits}</p></li>
                    <li><p><span>Blocked Shots:</span> ${stats.splits[0].stat.blocked}</p></li>`;
                    this.current_stats.innerHTML = output;
                })
            })
            .catch(err => console.log(err));
        })
    }

    playerLastSeasonStats() {
        this.last_seasonBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(this.json_last_stats)
            .then(people => people.json())
            .then(res => {
                res.stats.map(stats => {
                    let output = ``;
                    output += `<h2>Last Season Stats</h2>
                    <li><p><span>Goals:</span> ${stats.splits[0].stat.goals}</p></li>
                    <li><p><span>Assists:</span> ${stats.splits[0].stat.assists}</p></li>
                    <li><p><span>Points:</span> ${stats.splits[0].stat.points}</p></li>
                    <li><p><span>+-:</span> ${stats.splits[0].stat.plusMinus}</p></li>
                    <li><p><span>Games:</span> ${stats.splits[0].stat.games}</p></li>
                    <li><p><span>GWG:</span> ${stats.splits[0].stat.gameWinningGoals}</p></li>
                    <li><p><span>Overtime Goals:</span> ${stats.splits[0].stat.overTimeGoals}</p></li>
                    <li><p><span>Shots:</span> ${stats.splits[0].stat.shots}</p></li>
                    <li><p><span>Shot %:</span> ${stats.splits[0].stat.shotPct}</p></li>
                    <li><p><span>Power Play Goals:</span> ${stats.splits[0].stat.powerPlayGoals}</p></li>
                    <li><p><span>Power Play Points:</span> ${stats.splits[0].stat.powerPlayPoints}</p></li>
                    <li><p><span>Shorthanded Goals:</span> ${stats.splits[0].stat.shortHandedGoals}</p></li>
                    <li><p><span>Shorthanded Points:</span> ${stats.splits[0].stat.shortHandedPoints}</p></li>
                    <li><p><span>Time on Power Play:</span> ${stats.splits[0].stat.powerPlayTimeOnIce}</p></li>
                    <li><p><span>Time on Power Play / Game:</span> ${stats.splits[0].stat.powerPlayTimeOnIcePerGame}</p></li>
                    <li><p><span>Shorthanded Time On Ice:</span> ${stats.splits[0].stat.shortHandedTimeOnIce}</p></li>
                    <li><p><span>Shorthanded Time On Ice / Game:</span> ${stats.splits[0].stat.shortHandedTimeOnIcePerGame}</p></li>
                    <li><p><span>Time On Ice:</span> ${stats.splits[0].stat.timeOnIce}</p></li>
                    <li><p><span>Time On Ice / Game:</span> ${stats.splits[0].stat.timeOnIcePerGame}</p></li>
                    <li><p><span>Even Time On Ice:</span> ${stats.splits[0].stat.evenTimeOnIce}</p></li>
                    <li><p><span>Even Time On Ice / Game:</span> ${stats.splits[0].stat.evenTimeOnIcePerGame}</p></li>
                    <li><p><span>Face Off %:</span> ${stats.splits[0].stat.faceOffPct}</p></li>
                    <li><p><span>Hits:</span> ${stats.splits[0].stat.hits}</p></li>
                    <li><p><span>Blocked Shots:</span> ${stats.splits[0].stat.blocked}</p></li>`;
                    this.last_stats.innerHTML = output;
                })
            })
            .catch(err => console.log(err));
        })
    }

    playerCareerStats() {
        this.careerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(this.json_fetch)
            .then(people => people.json())
            .then(res => {
                res.people.map(people => {
                    let output = ``;
                    output += `<h2>Career Stats</h2>
                    <li><p><span>Goals:</span> ${people.stats[2].splits[0].stat.goals}</p></li>
                    <li><p><span>Goals:</span> ${people.stats[2].splits[0].stat.assists}</p></li>
                    <li><p><span>Goals:</span> ${people.stats[2].splits[0].stat.points}</p></li>
                    <li><p><span>+-:</span> ${people.stats[2].splits[0].stat.plusMinus}</p></li>
                    <li><p><span>Games:</span> ${people.stats[2].splits[0].stat.games}</p></li>
                    <li><p><span>GWG:</span> ${people.stats[2].splits[0].stat.gameWinningGoals}</p></li>
                    <li><p><span>Overtime Goals:</span> ${people.stats[2].splits[0].stat.overTimeGoals}</p></li>
                    <li><p><span>Shots:</span> ${people.stats[2].splits[0].stat.shots}</p></li>
                    <li><p><span>Shot %:</span> ${people.stats[2].splits[0].stat.shotPct}</p></li>
                    <li><p><span>Power Play Goals:</span> ${people.stats[2].splits[0].stat.powerPlayGoals}</p></li>
                    <li><p><span>Power Play Points:</span> ${people.stats[2].splits[0].stat.powerPlayPoints}</p></li>
                    <li><p><span>Shorthanded Goals:</span> ${people.stats[2].splits[0].stat.shortHandedGoals}</p></li>
                    <li><p><span>Shorthanded Points:</span> ${people.stats[2].splits[0].stat.shortHandedPoints}</p></li>
                    <li><p><span>Time on Power Play:</span> ${people.stats[2].splits[0].stat.powerPlayTimeOnIce}</p></li>
                    <li><p><span>Time on Power Play / Game:</span> ${people.stats[2].splits[0].stat.powerPlayTimeOnIcePerGame}</p></li>
                    <li><p><span>Shorthanded Time On Ice:</span> ${people.stats[2].splits[0].stat.shortHandedTimeOnIce}</p></li>
                    <li><p><span>Shorthanded Time On Ice / Game:</span> ${people.stats[2].splits[0].stat.shortHandedTimeOnIcePerGame}</p></li>
                    <li><p><span>Time On Ice:</span> ${people.stats[2].splits[0].stat.timeOnIce}</p></li>
                    <li><p><span>Time On Ice / Game:</span> ${people.stats[2].splits[0].stat.evenTimeOnIcePerGame}</p></li>
                    <li><p><span>Face Off %:</span> ${people.stats[2].splits[0].stat.faceOffPct}</p></li>
                    <li><p><span>Hits:</span> ${people.stats[2].splits[0].stat.hits}</p></li>
                    <li><p><span>Blocked Shots:</span> ${people.stats[2].splits[0].stat.blocked}</p></li>`;
                    this.career_stats.innerHTML = output;
                })
            })
        })
    }

    playoffCareerStats() {
        this.playoffBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(this.json_fetch)
            .then(people => people.json())
            .then(res => {
                res.people.map(people => {
                    let output = ``;
                    output += `<h2>Playoff Stats</h2>
                    <li><p><span>Goals:</span> ${people.stats[3].splits[0].stat.assists}</p></li>
                    <li><p><span>+-:</span> ${people.stats[3].splits[0].stat.plusMinus}</p></li>
                    <li><p><span>Games:</span> ${people.stats[3].splits[0].stat.games}</p></li>
                    <li><p><span>GWG:</span> ${people.stats[3].splits[0].stat.gameWinningGoals}</p></li>
                    <li><p><span>Overtime Goals:</span> ${people.stats[3].splits[0].stat.overTimeGoals}</p></li>
                    <li><p><span>Shots:</span> ${people.stats[3].splits[0].stat.shots}</p></li>
                    <li><p><span>Shot %:</span> ${people.stats[3].splits[0].stat.shotPct}</p></li>
                    <li><p><span>Power Play Goals:</span> ${people.stats[3].splits[0].stat.powerPlayGoals}</p></li>
                    <li><p><span>Power Play Points:</span> ${people.stats[3].splits[0].stat.powerPlayPoints}</p></li>
                    <li><p><span>Shorthanded Goals:</span> ${people.stats[3].splits[0].stat.shortHandedGoals}</p></li>
                    <li><p><span>Shorthanded Points:</span> ${people.stats[3].splits[0].stat.shortHandedPoints}</p></li>
                    <li><p><span>Time on Power Play:</span> ${people.stats[3].splits[0].stat.powerPlayTimeOnIce}</p></li>
                    <li><p><span>Time on Power Play / Game:</span> ${people.stats[3].splits[0].stat.powerPlayTimeOnIcePerGame}</p></li>
                    <li><p><span>Shorthanded Time On Ice:</span> ${people.stats[3].splits[0].stat.shortHandedTimeOnIce}</p></li>
                    <li><p><span>Shorthanded Time On Ice / Game:</span> ${people.stats[3].splits[0].stat.shortHandedTimeOnIcePerGame}</p></li>
                    <li><p><span>Time On Ice:</span> ${people.stats[3].splits[0].stat.timeOnIce}</p></li>
                    <li><p><span>Time On Ice / Game:</span> ${people.stats[3].splits[0].stat.evenTimeOnIcePerGame}</p></li>
                    <li><p><span>Face Off %:</span> ${people.stats[3].splits[0].stat.faceOffPct}</p></li>
                    <li><p><span>Hits:</span> ${people.stats[3].splits[0].stat.hits}</p></li>
                    <li><p><span>Blocked Shots:</span> ${people.stats[3].splits[0].stat.blocked}</p></li>`;
                    this.playoff_stats.innerHTML = output;
                })
            })
        })
    }
}

class TeamButtons extends Team {
    teamStatsBtn() {
        this.currentStatsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.current_season_stats.style.display = 'block';
            this.previous_season_stats.style.display = 'none';
        })

        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.previous_season_stats.style.display = 'block';
            this.current_season_stats.style.display = 'none';
        })
    }
}

class PlayerButtons {
    constructor() {
        this.currentBtn = document.querySelector('#current_stats');
        this.lastBtn = document.querySelector('#last_season');
        this.careerBtn = document.querySelector('#career_stats');
        this.playoffBtn = document.querySelector('#playoff_stats');
        this.current_stats = document.querySelector('.game_stats');
        this.previous_season = document.querySelector('.last_season_stats');
        this.career_stats = document.querySelector('.career_stats');
        this.playoff_stats = document.querySelector('.playoff_stats');
    }

    showCurrentStats() {
        this.currentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.current_stats.style.display = 'block';
            this.previous_season.style.display = 'none';
            this.career_stats.style.display = 'none';
            this.playoff_stats.style.display = 'none';
        })
    }

    showPreviousStats() {
        this.lastBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.previous_season.style.display = 'block';
            this.current_stats.style.display = 'none';
            this.career_stats.style.display = 'none';
            this.playoff_stats.style.display = 'none';
        })
    }

    showCareerStats() {
        this.careerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.career_stats.style.display = 'block';
            this.previous_season.style.display = 'none';
            this.current_stats.style.display = 'none';
            this.playoff_stats.style.display = 'none';
        })
    }

    showPlayoffStats() {
        this.playoffBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.playoff_stats.style.display = 'block';
            this.career_stats.style.display = 'none';
            this.previous_season.style.display = 'none';
            this.current_stats.style.display = 'none';
        })
    }
}

let show = new Team();
let randomPlayer = new RandomPlayer();
let playerStats = new RandomPlayerStats();
let buttons = new TeamButtons();
let player_btn = new PlayerButtons();
let playerpagestats = new Player();

if (window.location.href.match('index.html')) {
    show.loadTeams();
    randomPlayer.loadRandomPlayer();
    playerStats.currentStats();
    playerStats.lastSeasonStats();
    playerStats.careerStats();
    playerStats.playoffStats();
    player_btn.showCurrentStats();
    player_btn.showPreviousStats();
    player_btn.showCareerStats();
}

if (window.location.href.match('team.html')) {
    show.getTheTeam();
    show.getRoster();
    show.currentSeasonStats();
    show.previousSeasonTeamStats();
    buttons.teamStatsBtn();
}

if (window.location.href.match('player.html')) {
    playerpagestats.playerStats();
    playerpagestats.playerCurrentStats();
    playerpagestats.playerLastSeasonStats();
    playerpagestats.playerCareerStats();
    playerpagestats.playoffCareerStats();
    player_btn.showCurrentStats();
    player_btn.showPreviousStats();
    player_btn.showCareerStats();
    player_btn.showPlayoffStats();
}
