/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const res= await axios.get("http://api.tvmaze.com/search/shows",{params:{
        q:query
      }});

  let id=res.data[0].show.id;
  let name=res.data[0].show.name;
  let summary=res.data[0].show.summary;
  let image=res.data[0].show.image.medium;

  return[
    {
      id,
      name,
      summary,
      image
    }
  ]
}


/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
           <img class="card-img-top" src="${show.image}">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button type="button" class="btn btn-primary" id="load-episodes">Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }

  $("#load-episodes").on("click", loadEpisodes)
  

}

async function loadEpisodes(e){
  e.preventDefault();
  let showId=e.target.parentElement.parentElement.getAttribute("data-show-id")
  console.log(showId);
  console.log("button pressed");


   let episodes=await getEpisodes(showId);
   populateEpisodes(episodes);
}

function populateEpisodes(arrEpisodes){
  const episodesList=$("#episodes-list");
  $("#episodes-area").show();
  for(let i=0; i<arrEpisodes.length; i++){
  let $item=$(
    `<li>${arrEpisodes[i].name}, season:${arrEpisodes[i].season}, episode:${arrEpisodes[i].number}</li>`
  )
  episodesList.append($item);
  }


}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});



/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  const res=await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  const episodes=[];
  
for(let i=0; i<res.data.length;i++){
  episodes.push({
    id:res.data[i].id,
    name:res.data[i].name,
    season:res.data[i].season,
    number:res.data[i].number
  })

}
 console.log(episodes);
 console.log(res);
 return episodes;

  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
}
