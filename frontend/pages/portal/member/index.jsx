import React, {useState} from 'react'

//internal
import PortalTemplate from '../../../component/layouts/template'
import{GetMember} from '../../../service/member'
import {HandleAuth} from '../../../service/config'
import ModalFromnew from '../../../component/member/modalnew'
// import ModelMap from '../../../component/member/Modelmap'
// import ShowMaps from '../../../component/member/showmaps'
// import {GetMaps} from '../../../service/maps'
export default () =>{

  const [members, setMembers] = useState([])
  const [inputvalue, setInputvalue] = useState({})
  const [modal1, setModal1] = useState(false)
  const [errorMsg, setErrorMsg] = React.useState(false)
  // const [modalmap, setModalmap] = useState(false)
  // const [mapid, setMapId] =useState('')
  // const [modelshow, setModelshow] =useState(false)
  // const [showId, setShowId] = useState('')
  // const [mapsdata, setMapsdata] = useState([])
  // ShowMaps
  // const ModelShow = () =>{
  //   setModelshow(!modelshow)
  // }
  // const CloseModelShow = () =>{
  //   setModelshow(false)
  // }
  // const IDmaps = (id) =>{
  //   setShowId(id)
  //   ModelShow()
  // }
  // modal map
  // const ModalMap = () =>{
  //   setModalmap(!modalmap)
  // }
  // const CloseModalMap = () =>{
  //   setModalmap(false)
  // }
  // const selects = (id) =>{
  //   setMapId(id)
  //   ModalMap()
  // }

  // modal new
  const toggle = () =>{
    setModal1(!modal1)
    setErrorMsg(false)
  }
  const CloseModal = () =>{
    setModal1(false)
  }
  const messErr = () =>{
    setErrorMsg(true)
  }
  // get maps
  // const getmaps = async () =>{
  //   const { data } = await GetMaps()
  //   if(data.code === 'OK'){
  //     setMapsdata(data.results)
  //   }
  // }
  const getmember = async () => {
    try{
      const {data} = await GetMember(inputvalue)
      if(data.code === 'OK'){
        setMembers(data.results)
      }

    }catch(error){
      HandleAuth(error)
    }
  }
// search
const handle = (event) => {
  setInputvalue({ ...inputvalue, [event.target.name]: event.target.value })
}
  React.useEffect(() => {
    getmember()
    // getmaps()
  }, [])

    return(
      <PortalTemplate>
        <ModalFromnew modal1={modal1} getmember={getmember} CloseModal1={CloseModal} messErr={messErr} errorMsg={errorMsg} />
        {/* <ModelMap getmaps={getmaps} CloseModalMap={CloseModalMap} mapid={mapid} modalmap={modalmap} getmember={getmember} messErr={messErr} errorMsg={errorMsg}  />  
          <ShowMaps CloseModelShow={CloseModelShow} modelshow={modelshow} showId={showId} /> */}
          <div className="card cards">
                <div className="card-header span-a ">
                        <p className="text-title" >????????????????????????????????????</p>
                    </div>
            <div className="cars-body">
              <div className="row head-reservation">
                  <button className="btn btn-light" onClick={toggle} >
                      <i className="fas fa-plus-circle"></i> ???????????????
                  </button>
                  </div>
              <div className="row head-search">
                <div className="col-md-2">
                  <label className="mb-0 ">???????????????</label>
                  <input type="text" className="Selectd form-control" placeholder="?????????????????????????????????????????????????????????????????????" name="firstname" onChange={handle}/>
                </div>
                <div className="col-md-2 mt-4">
                  <input type="text" className="Selectd form-control" placeholder="?????????????????????????????????????????????????????????????????????????????????" name="tel" onChange={handle} />
                </div>
                  <div className="col-md-2">
                    <button className="btn btn-light mb-0 mt-4" onClick={getmember} >
                      <i className="fas fa-search"></i> ???????????????
                    </button>
                  </div>
              </div>
              <div className="col">
              <div className="col-md-12 table-responsive">
                        <table className="table table-ml table-bordered table-striped table-hover mt-3">
                          <thead>
                            <tr>
                              <th className="text-center">#</th>
                              <th>????????????</th>
                              <th>?????????????????????</th>
                              <th>?????????????????????</th>
                              <th>???????????????????????????????????????</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((v, i)=>{
                            return(
                            <tr key = {i + 'member'}>
                            <td className="text-center">{i + 1}</td>
                            <td>{v.firstname}</td>
                            <td>{v.lastname}</td>
                            <td>{v.address}</td>
                            <td>{v.tel}</td>
                            {/* <td className="text-center"> */}
                            {/* <button className="btn" style={{color:'green'}} onClick={selects.bind(this, v._id)} data-toggle="tooltip" data-placement="left" title="????????????????????????????????????">
                              <i className="fas fa-map-marked-alt"></i>
                              </button> */}
                              {/* <button className="btn" onClick={IDmaps.bind(this, v._id)} >
                                <i className="fas fa-eye"/>
                              </button> */}
                            {/* </td> */}
                          </tr>
                          )
                          })}
                        </tbody>
                      </table>
                </div>
              </div>
              </div>
            </div>
        </PortalTemplate>
    )
}