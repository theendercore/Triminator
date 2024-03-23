import {useGLTF} from "@react-three/drei";
import {DoubleSide, MeshStandardMaterial, NearestFilter, Texture, TextureLoader, Vector2, Vector3} from "three";
import {useState, useEffect} from "preact/hooks";

type FullArmorRenderProps = {
    position?: Vector3 | number[],
    mainTexture: string,
    leggingsTexture: string,
    iRotation?: Vector3 | number[],
    debug?: boolean
}


export default function FullArmorRenderer(
    {position, mainTexture, leggingsTexture, debug, iRotation}: FullArmorRenderProps
) {
    const [mainTex, setMainTex] = useState<Texture>(null!)
    const [leggingsTex, setLeggingsTex] = useState<Texture>(null!)

    useEffect(() => {
        const loader = new TextureLoader();
        loader.load(
            mainTexture,
            it => {
                it.magFilter = NearestFilter
                it.minFilter = NearestFilter
                it.colorSpace = "srgb"
                it.flipY = false
                it.userData = {"mimeType": "image/png"}
                setMainTex(it)
            }, undefined,
            err => console.error('An error occurred while loading the texture:', err)
        )
    }, []);

    const matProps = {
        map: mainTex,
        side: DoubleSide,
        normalScale: new Vector2(1, 1),
        wireframe: false,
        alphaTest: 0
    }
    const mainMat = new MeshStandardMaterial(matProps);
    const mainSecondMat = new MeshStandardMaterial({...matProps, alphaTest: 0.05});
    const leggingsMat = new MeshStandardMaterial({...matProps, map: leggingsTex});


    return (<group dispose={null} rotation={[0, 3.14, 0]} position={position}>
        <group position={[0.125, 0, 0]}>
            {debug && (<TextureDebuger position={[-1, 0, 0]} textures={[mainMat, mainSecondMat, leggingsMat]}/>)}
            <group position={[-.5, 0, 0]} rotation={iRotation}>
                <MainArmorRender mainMat={mainMat} secondaryMat={mainSecondMat}/>
            </group>
            <group position={[.5, 0, 0]} rotation={iRotation}>
                <LeggingsArmorRender mainMat={leggingsMat}/>
            </group>
        </group>
    </group>)
}


type MainArmorRenderProps = { mainMat: MeshStandardMaterial, secondaryMat: MeshStandardMaterial }

function MainArmorRender({mainMat, secondaryMat}: MainArmorRenderProps) {
    const {nodes} = useGLTF('./models/main_armor.glb')
    return <group dispose={null}>
        <group position={[0, 1.5, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Helmet.geometry}
                material={mainMat}
                position={[0, -1.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Hat_Layer.geometry}
                material={secondaryMat}
                position={[0, -1.5, 0]}
            />
        </group>
        <group position={[0, 1.5, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Chestplate.geometry}
                material={mainMat}
                position={[0, -1.5, 0]}
            />
        </group>
        <group position={[0.313, 1.375, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Right_Arm_Armor.geometry}
                material={mainMat}
                position={[-0.313, -1.375, 0]}
            />
        </group>
        <group position={[-0.313, 1.375, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Left_Arm_Armor.geometry}
                material={mainMat}
                position={[0.313, -1.375, 0]}
            />
        </group>
        <group position={[0.119, 0.75, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Right_Boot.geometry}
                material={mainMat}
                position={[-0.119, -0.75, 0]}
            />
        </group>
        <group position={[-0.119, 0.75, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Left_Boot.geometry}
                material={mainMat}
                position={[0.119, -0.75, 0.0005]}
                // rotation={[0.0003, 0, 0]}
            />
        </group>
    </group>
}

function LeggingsArmorRender({mainMat}: { mainMat: MeshStandardMaterial }) {
    const {nodes} = useGLTF('./models/leggings.glb')
    return (
        <group dispose={null}>
            <group position={[0, 1.5, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Belt.geometry}
                    material={mainMat}
                    position={[0, -1.5, 0]}
                />
            </group>

            <group position={[0.119, 0.75, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Right_Leg_Armor.geometry}
                    material={mainMat}
                    position={[-0.119, -0.75, 0]}
                />
            </group>
            <group position={[-0.119, 0.75, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Left_Leg_Armor.geometry}
                    material={mainMat}
                    position={[0.119, -0.75, 0]}
                />
            </group>
        </group>
    )
}

function TextureDebuger({position, textures}: { position: Vector3 | number[], textures: MeshStandardMaterial[] }) {
    return (
        <group position={position as Vector3}>
            {textures.map((e, idx) => (
                <mesh position={[0, 0.51 * idx + 0.25, 0]} key={e.id}>
                    <boxGeometry args={[.5, .5, .5]}/>
                    <meshStandardMaterial {...e}/>
                </mesh>
            ))}
        </group>
    )
}


useGLTF.preload('./models/main_armor.glb')
useGLTF.preload('./models/leggings.glb')