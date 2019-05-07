import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { submitQuery, saveQuery } from "../actions/searchActions";
import { getSomeEmployee } from "../actions/employeeActions";

// Child Component Imports
import FiltersWindow from "./FiltersWindow.js";
import "./searchResult.css";

// Material UI Imports
import {
  Grid,
  Card,
  Typography,
  IconButton,
  Button,
  withWidth,
  CircularProgress
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
import {
  Search,
  ExpandMore,
  NavigateNext,
  NavigateBefore
} from "@material-ui/icons";

// Component CSS to Javascript styles

class SearchResults extends Component {
  constructor() {
    super();

    this.state = {
      // States used for filter

      marketing: null,
      finance: null,
      human_resources: null,
      production: null,
      development: null,
      quality_management: null,
      sales: null,
      research: null,
      customer_service: null
    };

    // Methods passed to child components
    this.handleAmenities = this.handleAmenities.bind(this);
    this.handleClickToEmployee = this.handleClickToEmployee.bind(this);
    this.handleResetSearchOverview = this.handleResetSearchOverview.bind(this);

    // Action calls
    this.handleFiltersApply = this.handleFiltersApply.bind(this);
    this.backendCall = this.backendCall.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
  }

  // Upon mounting this component, browser is moved to the top of page.
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  componentWillUnmount() {
    // this.props.clearData();
  }

  // Used to reset <FiltersWindow /> upon pressing 'Search'
  handleResetSearchOverview = () => {
    this.setState({
      marketing: null,
      finance: null,
      human_resources: null,
      production: null,
      development: null,
      quality_management: null,
      sales: null,
      research: null,
      customer_service: null
    });
  };

  // Used to store the amenities input in <FiltersWindow />
  handleAmenities = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  };

  // Handles clicks to the apply filter button
  handleFiltersApply = dept => event => {
    event.preventDefault();
    this.backendCall(dept);
  };

  // Handles backend call for filter and sort
  backendCall(deptNumber) {
    /// get dept number

    let newQuery = {
      query: this.props.query.searchArgument,
      dept: deptNumber
      // pageStart: 1,
    };
    this.props.submitQuery(newQuery);

    // this.props.saveQuery(newQuery);
  }

  // Handles 'go to individual employee overview'
  handleClickToEmployee = empID => event => {
    event.preventDefault();
    this.props.getSomeEmployee(empID);
    this.props.history.push("/employeeOverview");
  };

  // Handles navigation to previous page of pagination
  goToPreviousPage = (queryResult, searchQuery) => event => {
    event.preventDefault();

    window.scrollTo(0, 0);
    queryResult.pageNumber--;
    let lastIndex = queryResult.lastIndex - 2 * searchQuery.numResults;
    if (lastIndex < 0 || queryResult.pageNumber === 1) {
      lastIndex = 0;
    }
    let newQuery = searchQuery;
    newQuery.lastIndex = lastIndex;
    newQuery.pageNumber = queryResult.pageNumber;

    this.props.saveQuery(newQuery);
    this.props.submitQuery(newQuery);
  };

  // Handles navigation to next page of pagination
  goToNextPage = (queryResult, searchQuery) => event => {
    event.preventDefault();

    window.scrollTo(0, 0);
    queryResult.pageNumber++;
    let newQuery = searchQuery;
    newQuery.lastIndex = queryResult.lastIndex;
    newQuery.pageNumber = queryResult.pageNumber;

    this.props.saveQuery(newQuery);
    this.props.submitQuery(newQuery);
  };

  render() {
    let {
      marketing,
      finance,
      human_resources,
      production,
      development,
      quality_management,
      sales,
      research,
      customer_service
    } = this.state;

    let { classes, width } = this.props;
    let { searchQuery, loading } = this.props.query;
    // Markup for each hotel result card
    let employees;
    if (loading) {
      employees = (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      );
    } else if (this.props.query.searchQuery && searchQuery.length > 0) {
      employees = searchQuery.map(employee => {
        return (
          <Grid item xs={12}>
            <Card square="false">
              <Grid
                container
                direction="flow"
                justify={isWidthDown("sm", width) ? "center" : "flex-start"}
                spacing={8}
              >
                <Grid item xs={12} md>
                  <Grid container direction="column" spacing={0}>
                    <Grid item>
                      <Typography variant="h5" color="primary">
                        {employee.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className="textBlack" variant="subtitle1">
                        ID: {employee.id}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" color="#ffffff">
                        Department: {employee.deptName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item xs="auto">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleClickToEmployee(employee.id)}
                      >
                        More Information
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        );
      });
    } else {
      employees = (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Typography variant="subtitle1">
              There are no employees matching your search...
            </Typography>
          </Grid>
        </Grid>
      );
    }
    // Markup for pagination
    let pagination = (
      <Grid
        container
        direction="flow"
        justify="center"
        alignItems="center"
        spacing={8}
      >
        <Grid item>
          <IconButton
            onClick={this.goToPreviousPage()} //hotelQuery, searchQuery)}
            disabled={
              true
              //   loading == true || hotelQuery.pageNumber == "1" ? true : false
            }
          >
            <NavigateBefore />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{1}</Typography>
          {/* //hotelQuery.pageNumber}</Typography> */}
        </Grid>
        <Grid item>
          <IconButton
            onClick={this.goToNextPage()} //hotelQuery, searchQuery)}
            disabled={
              true
              // loading == true || hotelQuery.nextExists != true ? true : false
            }
          >
            <NavigateNext />
          </IconButton>
        </Grid>
      </Grid>
    );

    return (
      <div style={{ minHeight: window.innerHeight - 180 }}>
        <Grid container direction="flow" spacing={8}>
          <FiltersWindow
            handleAmenities={this.handleAmenities}
            handleFiltersApply={this.handleFiltersApply}
            marketing={marketing}
            finance={finance}
            human_resources={human_resources}
            production={production}
            development={development}
            quality_management={quality_management}
            sales={sales}
            research={research}
            customer_service={customer_service}
          />
          <Grid item xs={12} sm={8} md={9} lg={9}>
            <Grid container direction="row" justify="center" spacing={8}>
              <Grid item xs={12}>
                <Grid container spacing={8}>
                  {employees}
                </Grid>
              </Grid>
            </Grid>
            {searchQuery && searchQuery.length > 0 ? pagination : <div />}
          </Grid>
        </Grid>
      </div>
    );
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.func.isRequired,
  getIndividualHotelResult: PropTypes.func.isRequired,
  submitQuery: PropTypes.func.isRequired,
  saveQuery: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  query: state.query
});

export default connect(
  mapStateToProps,
  { submitQuery, getSomeEmployee }
  //   { getIndividualHotelResult, submitQuery, saveQuery, clearData }
)(withWidth()(SearchResults));
