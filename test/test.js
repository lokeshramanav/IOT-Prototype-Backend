const db = require("./testModels");
const Mall = db.mall;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('malls', ()=>{

    beforeEach((done)=>{
        Mall.destroy({
            where: {},
            truncate: true
          }).catch((err)=>{done()})

    });


describe('/GET all malls', () => {
        it('it should GET all the malls', (done) => {
          chai.request(server)
              .get('/api/mall/getMalls')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.malls.should.be.a('array');
                done();
              });
        });
    });

describe('/POST add malls',()=>{
    it('it should not post a MALL with missing fields', (done)=>{
        let mall = {
            mall_name: "Marina Bay123"
        }
        chai.request(server)
            .post('/api/mall/addMall')
            .send(mall)
            .end((err,res)=>{
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('error');
              done();
            })
    });
    it('it should Add a MALL ', (done)=>{
        let mall = {
            mall_name: "Marina Bay123",
            mall_location: "MBS123"
        }
        chai.request(server)
            .post('/api/mall/addMall')
            .send(mall)
            .end((err,res)=>{
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('mall');
                  res.body.mall.should.have.property('id');
                  res.body.mall.should.have.property('mall_name');
                  res.body.mall.should.have.property('mall_location');
                  res.body.mall.mall_name.should.be.eql("Marina Bay123");
                  res.body.mall.mall_location.should.be.eql("MBS123");
              done();
            })
    });
})

})