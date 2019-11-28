import "reflect-metadata";
import * as mocha from "mocha";
import * as chai from "chai";
import * as request from "supertest";
const expect = chai.expect;

import {app} from "../src/app";

describe("Demo Spec", () => {

  let demoData, demoRouteUrl;

  beforeEach((done) => {
    demoRouteUrl = '/demo/create';

    demoData = {
      'validData': {
        "name": "test",
        "code": "test"
      },
      "invalidData": {
        "name": "test"
      }
    };

    done();
  });

   
  it("Should call demo route url", done => {
    request( app )
      .post( demoRouteUrl )
      .send( demoData['validData'] )
      .set('Accept', 'application/json')
      .expect(200)
      .end( (err, resp) =>  {
        expect(err).to.be.null;
        expect(resp.body).to.be.deep.equal(demoData["validData"])
        expect(resp.body).to.have.property('name');
        expect(resp.body).to.have.property('code');
      })
      done();
  });

  it("Should call demo route url with error response", done => {
    request( app )
      .post( demoRouteUrl )
      .send( demoData['validData'] )
      .set('Accept', 'application/json')
      .expect(400)
      .end( (err, resp) =>  {
        expect(err).to.be.not.null;
      })
      done();
  });

});