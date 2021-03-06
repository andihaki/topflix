import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import { Link } from "react-router-dom";

import { fetchDetails } from "../../redux/actions";

import createSlug from "../../utils/createSlug";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Recommendation = ({ recommendations, dispatch, onClick }) => {
  // console.log(recommendations);

  return (
    <div>
      <h3>Rekomendasi Film:</h3>
      <Grid>
        {recommendations.map(data => (
          <div key={data.id}>
            <Link
              to={createSlug(data.id)(data.title)}
              // onClick={onClick(data.id).bind(this)}
              onClick={() => dispatch(fetchDetails(data.id))}
            >
              <img
                src={"https://image.tmdb.org/t/p/w200" + data.poster_path}
                alt={data.title}
              />
            </Link>
          </div>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    recommendations: state.details.recommendations
  };
};

export default connect(mapStateToProps)(Recommendation);
