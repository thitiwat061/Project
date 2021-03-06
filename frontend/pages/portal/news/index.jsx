import React,{useState} from 'react'

// internal
import PortalTemplate from '../../../component/layouts/template'
import ModalCreate from '../../../component/news/createnews'
import {GetNews} from '../../../service/news' 
import { HandleAuth } from '../../../service/config'
import  DeleteNews  from '../../../component/news/deletenews'
import ModalUpdate from '../../../component/news/updatenews'

export default () =>{
  const [modal, setModal] = useState(false)
  const [errorMsg, setErrorMsg] = React.useState(false)
  const [datanews, satDatanews] = useState([])
  const [delet, setDel] = useState(false)
  const [delId, setDelId] = useState('')
  const [newsId, setNewsId] = useState('')
  const [modalupdate, setModalupdate] =useState(false)

   // update promotion
   const Modalupdate = () =>{
    setModalupdate(!modalupdate)
  }
  const Closeupdate = () =>{
    setNewsId('')
    setModalupdate(false)
  }
  const selest = (id) =>{
    setNewsId(id)
    Modalupdate()
  }

  // Delete 
  const CloseDelete = () => setDel(false)
  const delpromotion = () => {
    setDel(true)
  }

  const Iddel = (id) =>{
    setDelId(id)
    delpromotion()
  }
  // create inmome
  const toggle = () => {
    getnews()
    setModal(!modal)
    setErrorMsg(false)
  }
  const CloseModal = () => {
    setModal(false)
  }
  const messErr = () => {
    setErrorMsg(true)
  }

  const getnews = async () =>{
    try{
      const {data} = await GetNews()
      if(data.code === 'OK'){
        satDatanews(data.results)
      }
    }catch(error){
      HandleAuth(error)
    }
  }
  React.useEffect(() =>{
    getnews()
  },[])
    return(
        <PortalTemplate>
          <ModalCreate getnews={getnews} modal={modal} errorMsg={errorMsg} toggle={toggle} CloseModal={CloseModal} messErr={messErr} />
            <DeleteNews getnews={getnews} CloseDelete={CloseDelete} messErr={messErr} errorMsg={errorMsg} delet={delet} delId={delId} />
              <ModalUpdate getnews={getnews} Closeupdate={Closeupdate} newsId={newsId} modalupdate={modalupdate} messErr={messErr} errorMsg={errorMsg}  />
            <div>
                <div className="card cards">
                  <div className="card-header span-a ">
                        <p className="text-title" >??????????????????????????????????????????????????????????????????</p>
                    </div>
                    <div className="card-body">
                        <div className="row mt-3 ml-4">
                            <button className="btn btn-light" onClick={toggle} >
                                <i className="fas fa-plus-circle"></i> ???????????????
                            </button>
                        </div>
                        {/* <div className="row ml-3 mt-3">
                            <div className="col-md-2">
                                <label className="mb-0 ">???????????????</label>
                                    <input type="text" className="Selectd form-control" placeholder="???????????????????????????????????????????????????????????????????????????????????????" name="firstname" />
                            </div>
                        <div className="col-md-2">
                            <button className="btn btn-light mb-0 mt-4" >
                                <i className="fas fa-search"></i> ???????????????
                            </button>
                        </div>
                    </div> */}
                  <div className="col">
                    <div className="col-md-12 table-responsive">
                        <table className="table table-ml table-bordered table-striped table-hover mt-3">
                          <thead>
                            <tr>
                              <th className="text-center">#</th>
                              <th className="text-center">??????????????????</th>
                              <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {datanews.map((v,i)=>{
                            return(
                              <tr key={i + 'news'}>
                              <td className="text-center">{i+1}</td>
                              {/* <td className="text-center"><img src={"http://128.199.127.236:3001/api/news/imgpath/"+ v.name} className="news-liss-home" alt=""/></td> */}
                              <td className="text-center"><img src={"http://localhost:3001/news/imgpath/"+ v.name} className="news-liss-home" alt=""/></td>
                              <td className="text-center">
                              <button className="btn" onClick={selest.bind(this, v._id)}  data-toggle="tooltip" data-placement="left" title="???????????????" >
                                <i className="far fa-edit" ></i>
                              </button>
                              {/* <button className="btn " onClick={Iddel.bind(this, v._id)}  data-toggle="tooltip" data-placement="left" title="????????????????????????" >
                                <i className="far fa-edit" ></i>
                              </button> */}
                            </td>
                            </tr>
                            )
                          })}
                        </tbody>
                      </table>
                </div>
              </div>
            </div>
        </div>
    </div>
</PortalTemplate>
    )
}